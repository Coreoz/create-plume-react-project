type MonitoredObject = {
  promise: Promise<unknown>,
  promiseInfo?: object,
};

export default class PromiseMonitor {
  private readonly runningPromises: Map<Promise<unknown>, MonitoredObject>;

  constructor() {
    this.runningPromises = new Map();
  }

  monitor<T>(promise: Promise<T>, promiseInfo?: object): Promise<T> {
    this.runningPromises.set(promise, {
      promise,
      promiseInfo,
    });
    promise.finally(() => this.runningPromises.delete(promise));
    return promise;
  }

  getRunningPromises(): Promise<unknown>[] {
    return Array.from(this.runningPromises.keys());
  }

  getRunningPromisesWithInfo(): [Promise<unknown>, MonitoredObject][] {
    return Array.from(this.runningPromises.entries());
  }

  getRunningPromisesCount() {
    return this.runningPromises.size;
  }
}
