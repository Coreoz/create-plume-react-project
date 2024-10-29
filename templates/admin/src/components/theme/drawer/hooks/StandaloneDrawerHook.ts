import useDebouncedCallback from '@lib/react-hook-debounced/useDebouncedCallback';
import { useEffect, useState } from 'react';

type Props = {
  onCloseDrawer: () => void,
};

type StandaloneDrawerHook = {
  isDrawerOpen: boolean,
  onCloseDrawer: () => void,
};

/**
 * StandaloneDrawer should be used when the parent component of a drawer does not handle the opening state.
 *
 * MUI drawer component relies on the change in the open prop after it is mounted.
 * if mounted as open, there won't be no animations so we need to tell the component to delay the mounting
 *
 * @param onCloseDrawer the callback when the drawer closes
 * @return isDrawerOpen the value passed to the drawer component
 * @return onCloseDrawer the value passed to the drawer component
 */
function useStandaloneDrawer({ onCloseDrawer }: Props): StandaloneDrawerHook {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [open] = useDebouncedCallback(() => setIsOpen(true), 200);
  const [close] = useDebouncedCallback(
    (callback: () => void) => callback(),
    200,
  );

  useEffect(() => {
    open();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    close(onCloseDrawer);
  };

  return {
    isDrawerOpen: isOpen,
    onCloseDrawer: handleClose,
  };
}

export default useStandaloneDrawer;
