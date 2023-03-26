import { useRef, useState } from 'react';
import { Logger } from 'simple-logging-system';
import { genericError, HttpError, isHttpError } from 'simple-http-rest-client';
import { AnyPromise } from './AnyPromise';
import { useOnComponentUnMounted } from '../react-hooks-alias/ReactHooksAlias';

const logger = new Logger('promiseLoaderHook');

/**
 * Any Promise-like that provides then and catch method for errors.
 *
 * Errors must be of type {@link HttpError}.
 *
 * {@link HttpPromise} are natively compatible with {@link LoadingPromise}.
 */
export type LoadingPromise<T> = AnyPromise<T, HttpError>;

/**
 * Since {@link LoaderState.monitor} can be used without errors with raw {@link Promise}
 * that does not use {@link HttpError}, errors need to be checked.
 */
const sanitizePromiseError = (error: HttpError) => {
  if (isHttpError(error)) {
    return error;
  }
  logger.debug('Promise error is not an HttpError,'
    + 'if you monitor for loading raw Promise, make sure to: 1/ catch errors 2/ transform it'
    + 'to HttpError 3/ throw it', error);
  return genericError;
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
   * The main function provided by the hook {@link useLoader} to monitor the loading of a {@link LoadingPromise}.
   * @param httpPromise The `Promise` that needs to be monitored: is it loading? Has it raised any error?
   */
  monitor: (httpPromise: LoadingPromise<unknown>) => void;
};

/**
 * Hook used to monitor a `Promise` and easily know its state: Is it loading? Has it raised any error?
 *
 * This hooks does not take any parameter, the `Promise` using the returned method {@link LoaderState.monitor}
 */
export default function useLoader(): LoaderState {
  const isMountedRef = useRef<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>();
  const [loadingError, setLoadingError] = useState<HttpError>();

  useOnComponentUnMounted(() => () => {
    isMountedRef.current = false;
  });

  return {
    isLoading: isLoading ?? false,
    isLoaded: !isLoading && loadingError === undefined,
    error: loadingError,
    monitor: (httpPromise) => {
      setIsLoading(true);
      setLoadingError(undefined);
      return httpPromise
        .then(() => {
          // don't update state if the component is unmounted to avoid errors
          if (isMountedRef.current) {
            setIsLoading(false);
          }
        })
        .catch((error) => {
          // don't update state if the component is unmounted to avoid errors
          if (isMountedRef.current) {
            setLoadingError(sanitizePromiseError(error));
            setIsLoading(false);
          }
        });
    },
  };
}
