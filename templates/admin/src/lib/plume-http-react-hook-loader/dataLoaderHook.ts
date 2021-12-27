import { DataLoader } from './observableLoaderHook';
import { useOnComponentMounted } from '../react-hooks-alias/ReactHooksAlias';
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
export default function useDataLoader(dataPromise: () => LoadingPromise): DataLoader {
  const loader = useLoader();
  const dataLoader = () => loader.monitor(dataPromise());

  useOnComponentMounted(dataLoader);

  return {
    isLoaded: loader.isLoaded,
    isLoading: loader.isLoading,
    error: loader.error,
    loader: dataLoader,
  };
}
