import { useState } from 'react';
import { HttpError } from '../plume-http/client/HttpResponse';

/**
 * Any Promise-like that provides then and catch method for errors.
 *
 * Errors must be of type {@link HttpError}
 */
export type LoadingPromise = {
  then: (consumer: () => void) => LoadingPromise,
  catch: (consumer: (error: HttpError) => void) => LoadingPromise,
};

/**
 * The loading object that:
 * - Enables to {@link monitor} a Promise,
 * - Enables to have information about the loading status of the Promise,
 * see loading {@link error} and {@link isLoading} properties
 */
export type LoaderState = {
  /**
   * The error that might have occurred during the loading of the monitored `Promise`, see {@link monitor}
   */
  error?: HttpError,
  /**
   * If the `Promise` is still running and waiting for result
   */
  isLoading: boolean,
  /**
   * If a monitored `Promise` has been executed successfully without errors and no other `Promise` is currently running
   */
  isLoaded: boolean,
  /**
   * The main function provided by the hook {@link useLoader} to monitor the loading of a `Promise`
   * @param httpPromise The `Promise` that needs to be monitored: is it loading? Has it raised any error?
   */
  monitor: (httpPromise: LoadingPromise) => void;
};

/**
 * Hook used to monitor a `Promise` and easily know its state: Is it loading? Has it raised any error?
 *
 * This hooks does not take any parameter, the `Promise` using the returned method {@link LoaderState.monitor}
 */
export default function useLoader(): LoaderState {
  const [loadingState, setLoadingState] = useState<boolean>();
  const [loadingError, setLoadingError] = useState<HttpError>();

  return {
    isLoading: loadingState ?? false,
    isLoaded: loadingState === false && loadingError === undefined,
    error: loadingError,
    monitor: (httpPromise) => {
      setLoadingState(true);
      setLoadingError(undefined);
      return httpPromise
        .then(() => setLoadingState(false))
        .catch((error) => {
          setLoadingError(error);
          setLoadingState(false);
        });
    },
  };
}
