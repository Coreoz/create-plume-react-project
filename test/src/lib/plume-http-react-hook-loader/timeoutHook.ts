import {
  MutableRefObject, useEffect, useRef,
} from 'react';

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

type TimeoutType = ReturnType<typeof setTimeout>;

/**
 * This hook enables to use safely {@link setTimeout} in a component.
 * The issue using raw {@link setTimeout} is that it can resolve after the component has been unmounted...
 * This can create lots of very difficult bugs.
 *
 * This hook makes sure to stop/unregister the {@link setTimeout} when the component is being unmounted.
 * @param callback The function that will be called after {@link delayInMillis} time has passed.
 * If the callback changes over time, the callback called after the timeout will be the changed one.
 * If the timeout has already passed, the callback changes will have no impact.
 * @param delayInMillis The delay in milliseconds after which the {@link callback} will be executed.
 * Delay changes after the first call will be ignored.
 *
 * This hook is a typed and commented version of
 * https://github.com/WebDevSimplified/useful-custom-react-hooks/blob/main/src/2-useTimeout/useTimeout.js
 */
export default function useTimeout(callback: () => void, delayInMillis: number) {
  // it's important to have a React ref here: it enables to keep a reference to the last version of the callback
  const callbackRef: MutableRefObject<() => void> = useRef(callback);
  const timeoutIdRef: MutableRefObject<TimeoutType | undefined> = useRef<TimeoutType>();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const restartTimeout = () => {
    stopTimeout();
    startTimeout();
  };

  return { restartTimeout, stopTimeout };
}
