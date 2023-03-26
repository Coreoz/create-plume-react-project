import { Observable, useObservable } from 'micro-observables';
import { DependencyList, useRef, useState } from 'react';
import { HttpError } from 'simple-http-rest-client';
import { useOnComponentMountedWithSsrSupport, useOnComponentUnMounted } from '../react-hooks-alias/ReactHooksAlias';

/**
 * Describe an {@link Observable} data and the function to trigger the loading of this data.
 *
 * The {@link Observable} data represents a data that must be loaded for a component to be displayed correctly.
 */
export type ObservableDataHandler<T> = {
  /**
   * The {@link Observable} data for which the loading process will be monitored
   */
  dataObservable: Observable<T>,
  /**
   * The predicate that indicates if the current {@link Observable} data represents a loaded state or not
   */
  isLoadedPredicate?: (data: T) => boolean,
  /**
   * The function that tries to load the {@link Observable} data.
   * This function must return some kind of `Promise`, `HttpPromise`,
   * or anything that provides an object containing `catch()` method with an error of type {@link HttpError}.
   *
   * This function will try to load only {@link Observable} data that are not yet loaded.
   */
  loader: () => CatchablePromise,
};

/**
 * A data loader that enables to easily display:
 * - Loading message (if `isLoaded === false`)
 * - An error that happened during the data loading (if `error !== undefined`)
 * - A button that enables to try to load the data again if an error occurred
 * - The final component is the {@link Observable} is available (if `isLoaded === true`)
 */
export type DataLoader<T> = {
  /**
   * The error that might have occurred during the loading of the {@link Observable} data.
   *
   * In case an error has occurred, a button to retry loading the data should be proposed to
   * the user. The `onClick` property of the button should point to the {@link loader}
   */
  error?: HttpError,
  /**
   * `True` if the {@link Observable} data is being loaded
   */
  isLoading: boolean,
  /**
   * `True` if the {@link Observable} data is available, else `false`
   */
  isLoaded: boolean,
  /**
   * A function that will try to load again the data.
   *
   * When the loaded is executed, the {@link error} is cleared.
   */
  loader: () => void,
  /**
   * The loaded data once available (i.e. when {@link isLoaded === true}.
   * If no data is available, the `data` field is `undefined`.
   *
   * Loading components must rely on the {@link isLoaded} and {@link isLoading}
   * fields to display various loaders. This field may only be used by business components
   * that want to access the available data. This enables to easily create manually {@link DataLoader}
   * to use Loading components.
   */
  data?: T,
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
   * The hook used to execute the {@link Observable} data load, see {@link DataLoader.loader}
   */
  useOnComponentMountedHook: (callback: () => void) => void,
  /**
   * The array of {@link ObservableDataHandler}
   */
  observableSources: T,
};

/**
 * A configurable version of {@link useObservableLoader} that enables to
 * specify the hook used to execute the {@link Observable} data load, see {@link DataLoader.loader}.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useObservableLoaderConfigurable<T extends ObservableDataHandler<any>[]>(
  config: ObservableLoaderConfig<T>): DataLoader<unknown[]> {
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
        data,
      };
    });
  const isAllDataLoaded = allDataLoadable.every((dataLoadable) => dataLoadable.isLoaded);

  const isMountedRef = useRef<boolean>(true);
  const [loadingError, setLoadingError] = useState<HttpError>();
  // data loader with error handling
  const loaderWithErrorHandling = () => {
    setLoadingError(undefined);

    for (const dataLoadable of allDataLoadable) {
      // try to load only unloaded data
      if (!dataLoadable.isLoaded) {
        dataLoadable
          .loader()
          .catch((error) => {
            // don't update state if the component is unmounted to avoid errors
            if (isMountedRef) {
              setLoadingError(error);
            }
          });
      }
    }
  };

  useOnComponentUnMounted(() => {
    isMountedRef.current = false;
  });

  // try to load the data
  config.useOnComponentMountedHook(loaderWithErrorHandling);

  return {
    error: loadingError,
    isLoading: loadingError === undefined && !isAllDataLoaded,
    isLoaded: isAllDataLoaded,
    loader: loaderWithErrorHandling,
    data: isAllDataLoaded ? allDataLoadable.map((loadedData) => loadedData.data) : undefined,
  };
}

/**
 * Hook that handles {@link Observable} data loading. It takes {@link ObservableDataHandler} parameters
 * for all {@link Observable} data that will need to be loading and monitored.
 *
 * This returns then a {@link DataLoader} that enables to easily monitor the loading status
 * of the {@link Observable} data.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useObservableLoader<T extends ObservableDataHandler<any>[]>(
  observableSources: T,
  dependencies?: DependencyList,
) : DataLoader<unknown[]> {
  return useObservableLoaderConfigurable({
    observableSources,
    useOnComponentMountedHook: (onMounted) => useOnComponentMountedWithSsrSupport(onMounted, dependencies),
  });
}
