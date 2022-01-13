import { useRef, useState } from 'react';
import { DataLoader } from './observableLoaderHook';
import { useOnComponentMounted, useOnComponentUnMounted } from '../react-hooks-alias/ReactHooksAlias';
import useLoader, { LoadingPromise } from './promiseLoaderHook';

/**
 * Hook used to load data in a compatible way with {@link DataLoader}.
 *
 * This hook can be used to create a single component that will be in charge to display
 * the loading status of the `Promise` and a retry button in case an error happened.
 *
 * @param dataPromise The function that makes the call that returns a `Promise`.
 * This function is called as soon as the component has been mounted, see {@link useOnComponentMounted}.
 */
export default function useDataLoader<T>(dataPromise: () => LoadingPromise<T>): DataLoader<T> {
  const [data, setData] = useState<T>();
  const isMountedRef = useRef<boolean>(true);
  const loader = useLoader();
  const dataLoader = () => loader.monitor(dataPromise().then((result) => {
    // don't update state if the component is unmounted to avoid errors
    if (isMountedRef) {
      setData(result);
    }
  }));

  useOnComponentMounted(dataLoader);

  useOnComponentUnMounted(() => {
    isMountedRef.current = false;
  });

  return {
    isLoaded: loader.isLoaded,
    isLoading: loader.isLoading,
    error: loader.error,
    loader: dataLoader,
    data,
  };
}
