import {
  DependencyList, useEffect, useRef, useState,
} from 'react';
import { DataLoader } from './observableLoaderHook';
import useLoader, { LoadingPromise } from './promiseLoaderHook';

/**
 * Hook used to load data in a compatible way with {@link DataLoader}.
 *
 * This hook can be used to create a single component that will be in charge to display
 * the loading status of the `Promise` and a retry button in case an error happened.
 *
 * @param dataPromise The function that makes the call that returns a `Promise`.
 * This function is called as soon as the component has been mounted, see {@link useOnComponentMounted}.
 * @param dependencies The dependencies that once updated should make the loader to reload the data
 */
export default function useDataLoader<T>(
  dataPromise: () => LoadingPromise<T>,
  dependencies: DependencyList = [],
): DataLoader<T> {
  const [data, setData] = useState<T>();
  const isMountedRef = useRef<boolean>(true);
  const loader = useLoader();
  const dataLoader = () => loader.monitor(dataPromise().then((result) => {
    // don't update state if the component is unmounted to avoid errors
    if (isMountedRef) {
      setData(result);
    }
  }));

  useEffect(() => {
    // load the data as soon as the component is mounted or when the dependencies change
    dataLoader();

    return () => {
      // mark the component as unmounted
      isMountedRef.current = false;
    };
  }, dependencies);

  return {
    isLoaded: loader.isLoaded,
    isLoading: loader.isLoading,
    error: loader.error,
    loader: dataLoader,
    data,
  };
}
