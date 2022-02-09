import { useEffect, useRef } from 'react';

/**
 * Enable to control the timeout in the component where it is used.
 * See {@link useTimeout}
 */
export type TimeoutController = {
  /**
   * Stop and restart the timeout
   */
  restartTimeout: () => void,
  /**
   * Stop the timeout
   */
  stopTimeout: () => void,
};

/**
 * This hook enables to use safely {@link setTimeout} in a component.
 * The issue using raw {@link setTimeout} is that it can resolve after the component has been unmounted...
 * This can create lots of very difficult bugs.
 *
 * This hook makes sure to stop/unregister the {@link setTimeout} when the component is being unmounted.
 * @param callback The function that will be called after {@link delayInMillis} time has passed.
 * @param delayInMillis The delay in milliseconds after which the {@link callback} will be executed.
 *
 * This hook is a typed and commented version of
 * https://github.com/WebDevSimplified/useful-custom-react-hooks/blob/main/src/2-useTimeout/useTimeout.js
 */
export default function useTimeout(callback: () => void, delayInMillis: number) {
  // it's important to have a React ref here: it enables to keep a reference to the last version of the callback
  const callbackRef = useRef(callback);
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const startTimeout = () => {
    timeoutIdRef.current = setTimeout(() => callbackRef.current(), delayInMillis);
  };

  const stopTimeout = () => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
  };

  useEffect(() => {
    startTimeout();
    return stopTimeout;
  }, [delayInMillis, startTimeout, stopTimeout]);

  const restartTimeout = () => {
    stopTimeout();
    startTimeout();
  };

  return { restartTimeout, stopTimeout };
}
