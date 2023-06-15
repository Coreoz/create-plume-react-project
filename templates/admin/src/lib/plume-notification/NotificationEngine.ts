export type NotificationOptions = {
  style?: 'danger' | 'warning' | 'info' | 'success',
};

export default abstract class NotificationEngine {
  abstract add(message: string, options?: NotificationOptions): void;

  abstract addDanger(message: string): void;

  abstract addSuccess(message: string): void;

  abstract addWarning(message: string): void;

  abstract addInfo(message: string): void;
}
