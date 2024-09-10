import { ReactNode } from 'react';

export type ListHeadProps = {
  title: string,
  isLoading?: boolean,
  className?: string,
};

export type ListProps = {
  isEmpty: boolean,
  isLoading?: boolean,
  showLoader?: boolean,
  className?: string,
  emptyStateLabel?: string,
};

export type ListItemAction = {
  onClick: () => void,
  icon: ReactNode,
  label: string,
  disabled?: boolean,
};

export type ListItemProps = {
  className?: string,
  onClick?: () => void,
  actions?: ListItemAction[],
};
