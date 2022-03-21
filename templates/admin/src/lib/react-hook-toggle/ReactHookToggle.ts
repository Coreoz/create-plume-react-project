import { useCallback, useState } from 'react';

/**
 * Hook used to help handle toggle actions.
 */
export default function useToggle(initialState: boolean = false): [boolean, () => void] {
  const [value, setValue] = useState(initialState);

  return [
    value,
    useCallback(() => {
      setValue((previousValue: boolean) => !previousValue);
    }, []),
  ];
}
