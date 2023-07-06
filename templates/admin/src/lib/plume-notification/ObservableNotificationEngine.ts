import { Logger } from 'simple-logging-system';
import { observable, WritableObservable } from 'micro-observables';
import NotificationEngine, {
  NotificationOptions,
} from './NotificationEngine';

const logger: Logger = new Logger('ObservableNotificationEngine');

export type Notification = {
  message: string,
  options?: NotificationOptions,
};

export default class ObservableNotificationEngine implements NotificationEngine {
  private notification: WritableObservable<Notification | undefined>;

  constructor() {
    this.notification = observable(undefined);
  }

  currentNotification() {
    return this.notification.readOnly();
  }

  add(message: string, options?: NotificationOptions) {
    logger.info(`Should display the '${options?.style}' notification: ${message}`, options);
    this.notification.set({
      message,
      options,
    });
  }

  addDanger(message: string) {
    this.add(message, { style: 'danger' });
  }

  addSuccess(message: string) {
    this.add(message, { style: 'success' });
  }

  addWarning(message: string) {
    this.add(message, { style: 'warning' });
  }

  addInfo(message: string) {
    this.add(message, { style: 'info' });
  }
}
