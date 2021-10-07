import { observable, WritableObservable } from 'micro-observables';
import { Logger } from 'simple-logging-system';
import { Job, Scheduler } from 'simple-job-scheduler';
import SessionApi, { SessionCredentials, SessionToken } from '../../api/session/SessionApi';
import { User, UserWithExpiration } from './User';
import IdlenessDetector from '../../lib/user-session/IdlenessDetector';
import Permission from './Permission';
import PageActivityManager, { PageActivity } from '../../lib/user-session/page-activity/PageActivityManager';

const THRESHOLD_IN_MILLIS_TO_DETECT_EXPIRED_SESSION = 60 * 1000; // 1 minutes
const LOCAL_STORAGE_CURRENT_SESSION = 'user-session';
const HTTP_ERROR_ALREADY_EXPIRED_SESSION_TOKEN = 'ALREADY_EXPIRED_SESSION_TOKEN';

const logger = new Logger('SessionService');

export default class SessionService {
  private currentSession: WritableObservable<SessionToken | undefined>;

  private currentUser: WritableObservable<User | undefined>;

  private currentUserExpirationDateInSeconds?: number;

  private refreshSessionTokenScheduledJob?: Job;

  constructor(private readonly sessionApi: SessionApi,
    private readonly scheduler: Scheduler,
    private readonly pageActivityManager: PageActivityManager,
    private readonly idlenessDetector: IdlenessDetector) {
    this.currentSession = observable(undefined);
    this.currentUser = observable(undefined);
  }

  // data access

  getSessionToken() {
    return this.currentSession.readOnly().select((session) => session?.webSessionToken);
  }

  getCurrentUser() {
    return this.currentUser.readOnly();
  }

  isAuthenticated() {
    return this.currentUser.get() !== undefined;
  }

  hasPermission(permission: Permission) {
    return this.currentUser.get()?.permissions.includes(permission) ?? false;
  }

  // actions

  authenticate(credentials: SessionCredentials) {
    return this
      .sessionApi
      .authenticate(credentials)
      .then((sessionToken) => this.registerNewSession(sessionToken));
  }

  disconnect() {
    logger.info('Manual disconnection');
    this.discardSession();
  }

  tryInitializingSessionFromStorage() {
    const webSessionString = localStorage.getItem(LOCAL_STORAGE_CURRENT_SESSION);
    if (webSessionString) {
      const sessionToken: SessionToken = JSON.parse(webSessionString);
      logger.info('Found existing session in local storage, will try to use it', sessionToken.webSessionToken);
      const currentUser = this.registerNewSession(sessionToken);
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

  // internals

  private discardSession() {
    localStorage.removeItem(LOCAL_STORAGE_CURRENT_SESSION);
    this.currentSession.set(undefined);
    this.currentUser.set(undefined);
    this.currentUserExpirationDateInSeconds = undefined;
    this.refreshSessionTokenScheduledJob?.cancel();
    this.idlenessDetector.stopService();
    this.pageActivityManager.stopService();
  }

  private registerNewSession(sessionToken: SessionToken): User | undefined {
    const user = this.storeNewSession(sessionToken);
    if (user !== undefined) {
      this.currentUser.set(user);
      this.startSessionRefreshAndIdleDetection(
        sessionToken.refreshDurationInMillis, sessionToken.inactiveDurationInMillis,
      );
      return user;
    }
    return undefined;
  }

  private storeNewSession(sessionToken: SessionToken): User | undefined {
    const user = SessionService.parseJwtSession(sessionToken.webSessionToken);
    if (!SessionService.isUserSessionValid(user?.exp)) {
      logger.info(
        'Tried to store an expired session, '
        + `current date=${new Date()} session expiration date=${new Date(user.exp * 1000)}, `
        + 'you may need to fix your computer clock', user,
      );
      return undefined;
    }

    localStorage.setItem(LOCAL_STORAGE_CURRENT_SESSION, JSON.stringify(sessionToken));
    this.currentSession.set(sessionToken);
    this.currentUserExpirationDateInSeconds = user.exp;
    return user;
  }

  private refreshSession() {
    const currentSession = this.currentSession.get();
    if (currentSession === undefined) {
      logger.error('Trying to refresh session whereas the current session is empty');
      return;
    }

    this
      .sessionApi
      .refresh(currentSession.webSessionToken)
      .then((updatedSessionToken) => this.storeNewSession(updatedSessionToken))
      .catch((error) => {
        if (error.errorCode === HTTP_ERROR_ALREADY_EXPIRED_SESSION_TOKEN) {
          logger.info('Session is expired, disconnecting...');
          this.discardSession();
        } else {
          logger.error('Could not update session token', error);
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
    && !SessionService.isUserSessionValid(this.currentUserExpirationDateInSeconds)) {
      logger.info('Expired session detected on browser page active, disconnecting...');
      this.discardSession();
    }
  }

  private static isUserSessionValid(expirationDateInSeconds?: number) {
    return expirationDateInSeconds
      && (expirationDateInSeconds * 1000 + THRESHOLD_IN_MILLIS_TO_DETECT_EXPIRED_SESSION > Date.now());
  }

  private static parseJwtSession(webSessionToken: string): UserWithExpiration {
    return JSON.parse(decodeURIComponent(escape(atob(webSessionToken.split('.')[1]))));
  }
}
