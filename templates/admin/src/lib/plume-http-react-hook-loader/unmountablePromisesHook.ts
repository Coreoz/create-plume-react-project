import { useRef } from 'react';
import { AnyPromise } from './AnyPromise';
import { useOnComponentUnMounted } from '../react-hooks-alias/ReactHooksAlias';

/**
 * Function calls when the {@link Promise} resolution happens after the component has been unmounted.
 * See {@link StopPromisePropagationAfterUnmount}
 */
export interface OnUnmountedResolution<T, E> {
  /**
   * @param thenResult Contains the result if the {@link Promise} has succeeded
   * @param catchResult Contains the error if the {@link Promise} has failed
   */
  (thenResult?: T, catchResult?: E): void;
}

/**
 * The function used to wrap a {@link Promise} in a component to make sure
 * calls to {@link Promise.then} and {@link Promise.catch} are not made
 * if the component has been unmounted.
 * See {@link useUnmountablePromises}
 */
export interface StopPromisePropagationAfterUnmount {
  <T, E>(
    promise: AnyPromise<T, E>,
    onUnmountedResolution?: OnUnmountedResolution<T, E>,
  ): AnyPromise<T, E>;
}

/**
 * Hook used to avoid making actions after the component is unmounted and the {@link Promise} resolves.
 * For example:
 *  - On the page A, after the {@link Promise} resolves, the then statement changes the router to page B
 *  - But during the time the {@link Promise} resolves, the user gets bored and go to page C
 *  - We want to make sure that while the user is on page C, he does not get redirected suddenly on page B
 *  when the {@link Promise} finally resolves.
 *
 * Usage example:
 * ```
 * const stopPromisePropagationAfterUnmount = useUnmountablePromises();
 * // [...]
 * const submitData = () => stopPromisePropagationAfterUnmount(api.submit())
 *    .then(displayConfirmationMessage)
 *    .catch(displayErrorMessage);
 * const deleteRow = (rowId: number) => stopPromisePropagationAfterUnmount(api.delete(rowId))
 *   .then(displayConfirmationMessage)
 *   .catch(displayErrorMessage);
 * // [...]
 * // submitData & deleteRow are then attached to buttons in the JSX code
 * ```
 */
export default function useUnmountablePromises(): StopPromisePropagationAfterUnmount {
  const isMountedRef = useRef<boolean>(true);

  useOnComponentUnMounted(() => {
    isMountedRef.current = false;
  });

  return <T, E>(promise: AnyPromise<T, E>, onUnmountedResolution?: OnUnmountedResolution<T, E>): AnyPromise<T, E> => (
    // the idea is to not resolve or reject the Promise in case the component is not Mounted anymore
    new Promise<T>((resolve, reject) => {
      promise
        .then((result) => {
          if (isMountedRef.current) {
            resolve(result);
          } else {
            onUnmountedResolution?.(result, undefined);
          }
        })
        .catch((error) => {
          if (isMountedRef.current) {
            reject(error);
          } else {
            onUnmountedResolution?.(undefined, error);
          }
        });
    })
  );
}
