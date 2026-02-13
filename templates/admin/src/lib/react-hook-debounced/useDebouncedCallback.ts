import {
  RefObject,
  useCallback,
  useRef,
} from 'react';

type Timer = ReturnType<typeof setTimeout>;

/**
 * Returns a memoized function that will only call the passed function when it hasn't been called for the wait period
 * @param callback The function to be called
 * @param wait Wait period after function hasn't been called for
 * @returns A memoized function that is debounced
 */
function useDebouncedCallback<T = never>(callback: (args?: T) => void, wait: number) {
  const timeout: RefObject<Timer | undefined> = useRef(undefined);
  return [
    useCallback(
      (args?: T) => {
        const later = () => {
          if (timeout.current) {
            clearTimeout(timeout.current);
          }
          callback(args);
        };

        if (timeout.current) {
          clearTimeout(timeout.current);
        }
        timeout.current = setTimeout(later, wait);
      },
      [callback, wait],
    ),
    () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    },
  ];
}

export default useDebouncedCallback;
