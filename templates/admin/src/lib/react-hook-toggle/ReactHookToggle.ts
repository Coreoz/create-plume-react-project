import { useCallback, useState } from 'react';

/**
 * Hook used to help handle toggle actions.
 * It replaces the boolean state hooks.
 * @param initialState
 * @example const [isOpen, toggleOpen] = useToggle(true);
 *          <component onClick={toggleOpen} />
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
