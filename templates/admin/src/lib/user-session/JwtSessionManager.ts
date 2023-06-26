import { Observable, observable, WritableObservable } from 'micro-observables';
import { HttpError, HttpPromise } from 'simple-http-rest-client';
import { Job, Scheduler } from 'simple-job-scheduler';
import { Logger } from 'simple-logging-system';
import IdlenessDetector from './IdlenessDetector';
import PageActivityManager, { PageActivity } from './page-activity/PageActivityManager';

const logger: Logger = new Logger('JwtSessionManager');

export type ExpirableJwtValue = {
  exp: number,
};

export type RefreshableJwtToken = {
  webSessionToken: string,
  refreshDurationInMillis: number,
  inactiveDurationInMillis: number,
};

export interface SessionRefresher {
  refresh(webSessionToken: string): HttpPromise<RefreshableJwtToken>,
}

export type JwtSessionManagerConfig = {
  thresholdInMillisToDetectExpiredSession: number,
  localStorageCurrentSession: string,
  httpErrorAlreadyExpiredSessionToken: string,
};

/**
 * Handle the whole lifetime journey of a JWT session in the browser.
 */
export default class JwtSessionManager<U extends ExpirableJwtValue> {
  private currentSession: WritableObservable<RefreshableJwtToken | undefined>;

  private currentUser: WritableObservable<U | undefined>;

  private currentUserExpirationDateInSeconds?: number;

  private refreshSessionTokenScheduledJob?: Job;

  constructor(private readonly sessionRefresher: SessionRefresher,
    private readonly scheduler: Scheduler,
    private readonly pageActivityManager: PageActivityManager,
    private readonly idlenessDetector: IdlenessDetector,
    private readonly config: JwtSessionManagerConfig) {
    this.currentSession = observable(undefined);
    this.currentUser = observable(undefined);
  }

  // data access

  /**
   * Get the JWT session, generally to make API calls
   */
  getSessionToken(): Observable<string | undefined> {
    return this.currentSession.readOnly().select((session: RefreshableJwtToken | undefined) => (
      session?.webSessionToken),
    );
  }

  /**
   * Get the current user corresponding to the current JWT session
   */
  getCurrentUser(): Observable<U | undefined> {
    return this.currentUser.readOnly();
  }

  /**
   * Verify if there is a current user present
   */
  isAuthenticated() {
    return this.currentUser.select((user: U | undefined) => user !== undefined);
  }

  // actions

  /**
   * Declare a new user session.
   * It should be called after a successful authentication call that returns a JWT sessionToken
   * @returns the current User if the session is still valid, or else `undefined`
   */
  registerNewSession(sessionToken: RefreshableJwtToken): U | undefined {
    const user: U | undefined = this.storeNewSession(sessionToken);
    if (user !== undefined) {
      this.currentUser.set(user);
      this.startSessionRefreshAndIdleDetection(
        sessionToken.refreshDurationInMillis, sessionToken.inactiveDurationInMillis,
      );
      return user;
    }
    return undefined;
  }

  /**
   * Discard the user session as well as the JWT token
   */
  disconnect(): void {
    logger.info('Manual disconnection');
    this.discardSession();
  }

  /**
   * Try restauring the user session from the browser local storage
   */
  tryInitializingSessionFromStorage() {
    const webSessionString: string | null = localStorage.getItem(this.config.localStorageCurrentSession);
    if (webSessionString) {
      const sessionToken: RefreshableJwtToken = JSON.parse(webSessionString);
      logger.info('Found existing session in local storage, will try to use it', sessionToken.webSessionToken);
      const currentUser: U | undefined = this.registerNewSession(sessionToken);
      if (currentUser === undefined) {
        logger.info('The local storage session was expired, trashing it...');
        this.discardSession();
      } else {
        // refresh ASAP the session, else the session might be disconnected before the first refresh
        this.refreshSession();
      }
    } else {
      logger.info('No existing session in local storage');
    }
  }

  /**
   * Synchronize changes added to the localStorage from other tabs in order to:
   * - Disconnect the user when the localStorage session is deleted from another tab
   * - Update the session token when it is updated from another tab
   * - Authenticate the user if he is connected from another tab
   */
  synchronizeSessionFromOtherBrowserTags() {
    window.removeEventListener('storage', this.handleStorageChangeFromOtherTab, false);
    window.addEventListener('storage', this.handleStorageChangeFromOtherTab, false);
  }

  // internals

  private handleStorageChangeFromOtherTab = (event: StorageEvent) => {
    if (event.key === this.config.localStorageCurrentSession || event.key === null) {
      if (!event.newValue) {
        // the session has been discarded!
        logger.info('Discarding session since it has been discarded in another tab...');
        this.discardSession();
      } else if (event.oldValue) {
        // the session has been updated.
        logger.debug('Updating session since it has been updated in another tab...');
        const sessionToken: RefreshableJwtToken = JSON.parse(event.newValue);
        this.updateCurrentSession(sessionToken);
      } else {
        // the session has been created!
        logger.info('Creating user session since it has been created in another tab...');
        const sessionToken: RefreshableJwtToken = JSON.parse(event.newValue);
        this.registerNewSession(sessionToken);
      }
    }
  };

  private discardSession() {
    localStorage.removeItem(this.config.localStorageCurrentSession);
    this.currentSession.set(undefined);
    this.currentUser.set(undefined);
    this.currentUserExpirationDateInSeconds = undefined;
    this.refreshSessionTokenScheduledJob?.cancel();
    this.idlenessDetector.stopService();
    this.pageActivityManager.stopService();
  }

  private storeNewSession(sessionToken: RefreshableJwtToken): U | undefined {
    const user: U | undefined = this.updateCurrentSession(sessionToken);
    if (user) {
      // If the session is ok, it can be stored
      localStorage.setItem(this.config.localStorageCurrentSession, JSON.stringify(sessionToken));
    }
    return user;
  }

  private updateCurrentSession(sessionToken: RefreshableJwtToken): U | undefined {
    const user: U = this.parseJwtSession(sessionToken.webSessionToken);
    if (!this.isUserSessionValid(user?.exp)) {
      logger.info(
        'Tried to store an expired session, '
        + `current date=${new Date()} session expiration date=${new Date(user.exp * 1000)}, `
        + 'you may need to fix your computer clock', user,
      );
      return undefined;
    }

    this.currentSession.set(sessionToken);
    this.currentUserExpirationDateInSeconds = user.exp;
    return user;
  }

  private refreshSession() {
    const currentSession: RefreshableJwtToken | undefined = this.currentSession.get();
    if (currentSession === undefined) {
      logger.error('Trying to refresh session whereas the current session is empty');
      return;
    }

    this
      .sessionRefresher
      .refresh(currentSession.webSessionToken)
      .then((updatedSessionToken: RefreshableJwtToken) => this.storeNewSession(updatedSessionToken))
      .catch((error: HttpError) => {
        if (error.errorCode === this.config.httpErrorAlreadyExpiredSessionToken) {
          logger.info('Session is expired, disconnecting...');
          this.discardSession();
        } else {
          logger.warn('Could not update session token', { error });
        }
      });
  }

  private startSessionRefreshAndIdleDetection(refreshDurationInMillis: number, inactiveDurationInMillis: number) {
    this.refreshSessionTokenScheduledJob = this.scheduler.schedule(
      'Refresh session token',
      () => this.refreshSession(),
      refreshDurationInMillis,
    );
    this.idlenessDetector.startService(
      () => {
        logger.info('Idleness detected, disconnecting...');
        this.discardSession();
      },
      inactiveDurationInMillis,
      1000,
    );
    this
      .pageActivityManager
      .startService((eventType: PageActivity) => this.onBrowserPageActivityChange(eventType));
  }

  private onBrowserPageActivityChange(eventType: PageActivity) {
    if (eventType === PageActivity.ACTIVE
      && !this.isUserSessionValid(this.currentUserExpirationDateInSeconds)) {
      logger.info('Expired session detected on browser page active, disconnecting...');
      this.discardSession();
    }
  }

  private isUserSessionValid(expirationDateInSeconds?: number) {
    return expirationDateInSeconds
      && (expirationDateInSeconds * 1000 + this.config.thresholdInMillisToDetectExpiredSession > Date.now());
  }

  // eslint-disable-next-line class-methods-use-this
  private parseJwtSession(webSessionToken: string): U {
    // eslint-disable-next-line max-len
    // maybe change this one day: https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings
    return JSON.parse(decodeURIComponent(escape(atob(webSessionToken.split('.')[1]))));
  }
}
