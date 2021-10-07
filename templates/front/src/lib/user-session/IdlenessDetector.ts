import { Job, Scheduler } from 'simple-job-scheduler';
import UserActivityListener from './user-activity/UserActivityListener';

/**
 * Manages user idleness detection in the webpage.
 * The user activity monitoring can be customized,
 * but default it checks mouse events, keyboards events and touch events.
 */
export default class IdlenessDetector {
  private detectorJob?: Job;

  private onIdlenessDetected?: () => void;

  private registerUserActivityFunction?: () => void;

  private lastActivityTimestampInMillis: number = 0;

  constructor(private readonly scheduler: Scheduler, private readonly userActivityListener: UserActivityListener) {
  }

  /**
   * Start monitoring user activity and running actions in case of idleness
   * @param onIdlenessDetected Function that will be called by the IdlenessDetector when some idleness is detected
   */
  startService(onIdlenessDetected: () => void,
    inactiveDurationInMillis: number,
    idlenessDetectionCheckThreshold: number) {
    this.onIdlenessDetected = onIdlenessDetected;
    if (this.detectorJob) {
      // do not start the service if it is already started
      return;
    }
    this.registerUserActivityFunction = () => this.registerUserActivity(
      inactiveDurationInMillis, idlenessDetectionCheckThreshold,
    );
    this.lastActivityTimestampInMillis = Date.now();
    this.userActivityListener.startUserActivityDetector(this.registerUserActivityFunction);
    this.startIdlenessDetection(inactiveDurationInMillis, idlenessDetectionCheckThreshold);
  }

  /**
   * Stop monitoring user activity and running actions in case of idleness
   */
  stopService() {
    if (this.registerUserActivityFunction) {
      this.userActivityListener.stopUserActivityDetector(this.registerUserActivityFunction);
    }
    this.stopIdlenessDetection();
    this.registerUserActivityFunction = undefined;
  }

  /**
   * Get the number of milliseconds since the user is idle
   */
  idleTimeInMillis() {
    return Date.now() - this.lastActivityTimestampInMillis;
  }

  /**
   * Indicate that a user activity has been detected.
   * The inactivity counter is reset.
   */
  private registerUserActivity(
    inactiveDurationInMillis: number, idlenessDetectionCheckThreshold: number,
  ) {
    this.lastActivityTimestampInMillis = Date.now();
    if (this.detectorJob === undefined) {
      this.startIdlenessDetection(inactiveDurationInMillis, idlenessDetectionCheckThreshold);
    }
  }

  private startIdlenessDetection(
    inactiveDurationInMillis: number, idlenessDetectionCheckThreshold: number,
  ) {
    this.detectorJob = this.scheduler.schedule(
      'Idleness detector',
      () => this.verifyUserIdleness(inactiveDurationInMillis),
      idlenessDetectionCheckThreshold,
    );
  }

  private stopIdlenessDetection() {
    this.detectorJob?.cancel();
    this.detectorJob = undefined;
  }

  /**
   * If the global idleness overcome the idleness threshold,
   * then the onIdlenessDetected function is called
   */
  private verifyUserIdleness(inactiveDurationInMillis: number) {
    if (this.idleTimeInMillis() > inactiveDurationInMillis) {
      if (this.onIdlenessDetected) {
        this.onIdlenessDetected();
      }
      this.stopIdlenessDetection();
    }
  }
}
