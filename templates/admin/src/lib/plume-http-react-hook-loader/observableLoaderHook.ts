import { Observable, useObservable } from 'micro-observables';
import { useState } from 'react';
import { HttpError } from '../plume-http/client/HttpResponse';
import { useOnComponentMountedWithSsrSupport } from '../react-hooks-alias/ReactHooksAlias';

/**
 * Describe an `Observable` data and the function to trigger the loading of this data.
 *
 * The `Observable` data represents a data that must be loaded for a component to be displayed correctly.
 */
export type ObservableDataHandler<T> = {
  /**
   * The `Observable` data for which the loading process will be monitored
   */
  dataObservable: Observable<T>,
  /**
   * The predicate that indicates if the current `Observable` data represents a loaded state or not
   */
  isLoadedPredicate?: (data: T) => boolean,
  /**
   * The function that tries to load the `Observable` data.
   * This function must return some kind of `Promise`, `HttpPromise`,
   * or anything that provides an object containing `catch()` method with an error of type {@link HttpError}.
   *
   * This function will try to load only `Observable` data that are not yet loaded.
   */
  loader: () => CatchablePromise,
};

/**
 * A data loader that enables to easily display:
 * - Loading message (if `isLoaded === false`)
 * - An error that happened during the data loading (if `error !== undefined`)
 * - A button that enables to try to load the data again if an error occurred
 * - The final component is the `Observable` is available (if `isLoaded === true`)
 */
export type DataLoader = {
  /**
   * The error that might have occurred during the loading of the `Observable` data.
   *
   * In case an error has occurred, a button to retry loading the data should be proposed to
   * the user. The `onClick` property of the button should point to the {@link loader}
   */
  error?: HttpError,
  /**
   * `True` if the `Observable` data is being loaded
   */
  isLoading: boolean,
  /**
   * `True` if the `Observable` data is available, else `false`
   */
  isLoaded: boolean,
  /**
   * A function that will try to load again the data.
   *
   * When the loaded is executed, the {@link error} is cleared.
   */
  loader: () => void,
};

/**
 * Any Promise-like that provides a catch method for errors.
 *
 * Errors must be of type {@link HttpError}
 */
export type CatchablePromise = {
  catch: (consumer: (error: HttpError) => void) => unknown;
};

/**
 * {@link useObservableLoaderConfigurable} configuration object.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ObservableLoaderConfig<T extends ObservableDataHandler<any>[]> = {
  /**
   * The hook used to execute the `Observable` data load, see {@link DataLoader.loader}
   */
  useOnComponentMountedHook: (callback: () => void) => void,
  /**
   * The array of {@link ObservableDataHandler}
   */
  observableSources: T,
};

/**
 * A configurable version of {@link useObservableLoader} that enables to
 * specify the hook used to execute the `Observable` data load, see {@link DataLoader.loader}.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useObservableLoaderConfigurable<T extends ObservableDataHandler<any>[]>(
  config: ObservableLoaderConfig<T>): DataLoader {
  // first check the data loaded status
  const allDataLoadable = config
    .observableSources
    .map((dataObservable) => {
      const data = useObservable(dataObservable.dataObservable);

      return {
        loader: dataObservable.loader,
        isLoaded: dataObservable.isLoadedPredicate
          ? dataObservable.isLoadedPredicate(data)
          : data !== undefined,
      };
    });
  const isAllDataLoaded = allDataLoadable.every((dataLoadable) => dataLoadable.isLoaded);

  const [loadingError, setLoadingError] = useState<HttpError>();
  // data loader with error handling
  const loaderWithErrorHandling = () => {
    setLoadingError(undefined);

    for (const dataLoadable of allDataLoadable) {
      // try to load only unloaded data
      if (!dataLoadable.isLoaded) {
        dataLoadable
          .loader()
          .catch(setLoadingError);
      }
    }
  };

  // try to load the data
  config.useOnComponentMountedHook(loaderWithErrorHandling);

  return {
    error: loadingError,
    isLoading: loadingError === undefined && !isAllDataLoaded,
    isLoaded: isAllDataLoaded,
    loader: loaderWithErrorHandling,
  };
}

/**
 * Hook that handles `Observable` data loading. It takes {@link ObservableDataHandler} parameters
 * for all `Observable` data that will need to be loading and monitored.
 *
 * This returns then a {@link DataLoader} that enables to easily monitor the loading status
 * of the `Observable` data.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useObservableLoader<T extends ObservableDataHandler<any>[]>(...observableSources: T)
  :DataLoader {
  return useObservableLoaderConfigurable({
    observableSources,
    useOnComponentMountedHook: useOnComponentMountedWithSsrSupport,
  });
}
