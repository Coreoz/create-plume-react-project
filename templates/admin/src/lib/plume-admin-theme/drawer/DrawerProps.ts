import { PropsWithChildren } from 'react';

export type DrawerProps = PropsWithChildren<{
  title: string,
  isOpen: boolean,
  onClose: () => void,
  width?: number,
  className?: string,
  anchor?: 'left' | 'top' | 'right' | 'bottom',
}>;
