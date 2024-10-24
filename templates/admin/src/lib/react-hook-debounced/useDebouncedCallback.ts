import { useCallback, useRef, MutableRefObject } from 'react';

/**
 * Returns a memoized function that will only call the passed function when it hasn't been called for the wait period
 * @param callback The function to be called
 * @param wait Wait period after function hasn't been called for
 * @returns A memoized function that is debounced
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useDebouncedCallback(callback: (...args: any) => void, wait: number) {
  const timeout: MutableRefObject<ReturnType<typeof setTimeout> | undefined> = useRef();
  return [
    useCallback(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (...args: any[]) => {
        const later = () => {
          if (timeout.current) {
            clearTimeout(timeout.current);
          }
          callback(...args);
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
