import { PropsWithChildren, ReactNode } from 'react';

export type ListHeadProps = PropsWithChildren<{
  title: string,
  isLoading?: boolean,
  className?: string,
}>;

export type ListProps = PropsWithChildren<{
  isEmpty: boolean,
  isLoading?: boolean,
  showLoader?: boolean,
  className?: string,
  emptyStateLabel?: string,
}>;

export type ListItemAction = {
  onClick: () => void,
  icon: ReactNode,
  label: string,
  disabled?: boolean,
};

export type ListItemProps = PropsWithChildren<{
  className?: string,
  onClick?: () => void,
  actions?: ListItemAction[],
}>;
