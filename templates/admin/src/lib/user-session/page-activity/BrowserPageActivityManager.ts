import { Logger } from 'simple-logging-system';
import PageActivityManager, { PageActivity } from './PageActivityManager';

const logger: Logger = new Logger('BrowserPageActivityManager');

/**
 * Provide a way to be notified if the tab containing the JS app is in the foreground or not.
 * This works only if the "visibilitychange" browser API is present.
 */
export default class BrowserPageActivityManager implements PageActivityManager {
  private readonly documentHiddenPropertyName: string;

  private readonly visibilityChangeEventName: string;

  private readonly isVisibilityChangeEventUnavailable: boolean;

  private handleVisibilityChangeFunction?: () => void;

  constructor() {
    let documentHiddenPropertyName: string | undefined;
    let visibilityChangeEventName: string | undefined;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    if (typeof (document as any).msHidden !== 'undefined') {
      documentHiddenPropertyName = 'msHidden';
      visibilityChangeEventName = 'msvisibilitychange';
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    } else if (typeof (document as any).webkitHidden !== 'undefined') {
      documentHiddenPropertyName = 'webkitHidden';
      visibilityChangeEventName = 'webkitvisibilitychange';
    }
    this.documentHiddenPropertyName = documentHiddenPropertyName ?? 'hidden';
    this.visibilityChangeEventName = visibilityChangeEventName ?? 'visibilitychange';
    this.isVisibilityChangeEventUnavailable = typeof document.addEventListener === 'undefined'
      || this.documentHiddenPropertyName === undefined;
  }

  startService(onBrowserPageActivityChange: (pageActivityEvent: PageActivity) => void) {
    if (this.handleVisibilityChangeFunction) {
      // do not start the service if it is already started
      return;
    }

    if (this.isVisibilityChangeEventUnavailable) {
      logger.warn('Visibility API is not implemented in browser, activity/inactivity detection may not work correctly');
    } else {
      this.handleVisibilityChangeFunction = () => this.handleVisibilityChange(onBrowserPageActivityChange);
      document.addEventListener(
        this.visibilityChangeEventName, this.handleVisibilityChangeFunction, false,
      );
    }
  }

  stopService() {
    if (!this.isVisibilityChangeEventUnavailable && this.handleVisibilityChangeFunction) {
      document.removeEventListener(
        this.visibilityChangeEventName, this.handleVisibilityChangeFunction, false,
      );
    }
    this.handleVisibilityChangeFunction = undefined;
  }

  private handleVisibilityChange(onBrowserPageActivityChange: (pageActivityEvent: PageActivity) => void) {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    if ((document as any)[this.documentHiddenPropertyName]) {
      onBrowserPageActivityChange(PageActivity.INACTIVE);
    } else {
      onBrowserPageActivityChange(PageActivity.ACTIVE);
    }
  }
}
