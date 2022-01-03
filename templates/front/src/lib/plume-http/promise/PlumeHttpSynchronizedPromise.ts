import PlumeHttpPromise from './PlumeHttpPromise';

/**
 * Use a {@link PlumeHttpPromise} loader to make sure there is only one execution at a time.
 * See {@link PlumeHttpSynchronizedPromise.load}.
 */
export default class PlumeHttpSynchronizedPromise<T> {
  private loadingPromise?: Promise<T>;

  private loadingContext?: object;

  constructor(private readonly promiseLoader: () => PlumeHttpPromise<T>) {
  }

  /**
   * Tries to find and return the currently loading {@link PlumeHttpPromise} or creates and returns a new one.
   */
  load(): PlumeHttpPromise<T> {
    if (!this.loadingPromise) {
      const plumePromise = this
        .promiseLoader()
        .then((data) => {
          this.clearLoading();
          return data;
        })
        .catch((error) => {
          this.clearLoading();
          // eslint-disable-next-line @typescript-eslint/no-throw-literal
          throw error;
        });
      this.loadingPromise = plumePromise.toPromise();
      this.loadingContext = plumePromise.getDebugContext();
    }
    return new PlumeHttpPromise(this.loadingPromise, this.loadingContext);
  }

  private clearLoading() {
    this.loadingPromise = undefined;
    this.loadingContext = undefined;
  }
}
