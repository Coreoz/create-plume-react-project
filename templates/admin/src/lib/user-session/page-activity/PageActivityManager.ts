export enum PageActivity {
  ACTIVE,
  INACTIVE,
}

export default abstract class PageActivityManager {
  abstract startService(onBrowserPageActivityChange: (pageActivityEvent: PageActivity) => void): void;

  abstract stopService(): void;
}
