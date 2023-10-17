import { Scheduler } from 'simple-job-scheduler';
import SessionApi, { SessionCredentials } from '../../api/session/SessionApi';
import IdlenessDetector from '../../lib/user-session/IdlenessDetector';
import PageActivityManager from '../../lib/user-session/page-activity/PageActivityManager';
import Permission from './Permission';
import { UserWithExpiration } from './User';
import JwtSessionManager, { RefreshableJwtToken } from '../../lib/user-session/JwtSessionManager';

const THRESHOLD_IN_MILLIS_TO_DETECT_EXPIRED_SESSION: number = 60 * 1000; // 1 minutes
const LOCAL_STORAGE_CURRENT_SESSION: string = 'user-session';
const HTTP_ERROR_ALREADY_EXPIRED_SESSION_TOKEN: string = 'ALREADY_EXPIRED_SESSION_TOKEN';

export default class SessionService {
  private jwtSessionManager: JwtSessionManager<UserWithExpiration>;

  constructor(private readonly sessionApi: SessionApi,
    private readonly scheduler: Scheduler,
    private readonly pageActivityManager: PageActivityManager,
    private readonly idlenessDetector: IdlenessDetector) {
    this.jwtSessionManager = new JwtSessionManager<UserWithExpiration>(
      sessionApi,
      scheduler,
      pageActivityManager,
      idlenessDetector,
      {
        localStorageCurrentSession: LOCAL_STORAGE_CURRENT_SESSION,
        thresholdInMillisToDetectExpiredSession: THRESHOLD_IN_MILLIS_TO_DETECT_EXPIRED_SESSION,
        httpErrorAlreadyExpiredSessionToken: HTTP_ERROR_ALREADY_EXPIRED_SESSION_TOKEN,
      },
    );
  }

  // data access

  getSessionToken() {
    return this.jwtSessionManager.getSessionToken();
  }

  getCurrentUser() {
    return this.jwtSessionManager.getCurrentUser();
  }

  isAuthenticated() {
    return this.jwtSessionManager.isAuthenticated();
  }

  hasPermission(permission: Permission) {
    return this.jwtSessionManager.getCurrentUser().select((user?: UserWithExpiration) => (
      user?.permissions.includes(permission) ?? false),
    );
  }

  // actions

  authenticate(credentials: SessionCredentials) {
    return this
      .sessionApi
      .authenticate(credentials)
      .then((sessionToken: RefreshableJwtToken) => this.jwtSessionManager.registerNewSession(sessionToken));
  }

  disconnect() {
    this.jwtSessionManager.disconnect();
  }

  tryInitializingSessionFromStorage() {
    this.jwtSessionManager.tryInitializingSessionFromStorage();
  }

  synchronizeSessionFromOtherBrowserTags() {
    this.jwtSessionManager.synchronizeSessionFromOtherBrowserTags();
  }
}
