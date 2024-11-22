import useMessages, { Messages } from '@i18n/hooks/messagesHook';
import classNames from '@lib/class-names/ClassNames';
import { ListProps } from '@lib/plume-admin-theme/list/ListProps';
import React from 'react';
import ListLoader from './ListLoader';

import scss from './list.module.scss';

type ListEmptyStateProps = {
  label: string,
};

function EmptyState({ label }: Readonly<ListEmptyStateProps>) {
  return (
    <div className={scss.listEmpty}>
      <span>{label}</span>
    </div>
  );
}

/**
 * This component handles the display of a loading list
 * - A loader is displayed when the elements are loading
 * - An empty state is displayed when no elements were found
 * - Otherwise, the elements are displayed through the {@param children}
 */
function List({
  isEmpty,
  isLoading = false,
  showLoader = true,
  emptyStateLabel,
  className,
  children,
}: Readonly<ListProps>) {
  const { messages }: Messages = useMessages();

  if (isLoading && showLoader) {
    return (
      <div className={classNames(scss.list, className)}>
        <ListLoader />
      </div>
    );
  }
  if (!isLoading && isEmpty) {
    return (
      <div className={classNames(scss.list, className)}>
        <EmptyState label={emptyStateLabel ?? messages.label.empty} />
      </div>
    );
  }
  return (
    <div className={classNames(scss.list, className)}>
      {children}
    </div>
  );
}

export default List;
