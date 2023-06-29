import UserActivityListener from './UserActivityListener';

const PAGE_CHANGE_EVENTS: string[] = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];

export default class BrowserUserActivityListener implements UserActivityListener {
  // eslint-disable-next-line class-methods-use-this
  startUserActivityDetector(registerUserActivity: () => void): void {
    // eslint-disable-next-line no-restricted-syntax
    for (const eventName of PAGE_CHANGE_EVENTS) {
      document.addEventListener(eventName, registerUserActivity, true);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  stopUserActivityDetector(registerUserActivity: () => void): void {
    // eslint-disable-next-line no-restricted-syntax
    for (const eventName of PAGE_CHANGE_EVENTS) {
      document.removeEventListener(eventName, registerUserActivity, true);
    }
  }
}
