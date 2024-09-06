import useMessages from '@i18n/hooks/messagesHook';
import { ListHeadProps } from '@lib/plume-admin-theme/list/ListProps';
import React, { PropsWithChildren } from 'react';

import scss from './list-head.module.scss';

function ListHead({ title, isLoading, children }: PropsWithChildren<ListHeadProps>) {
  const { messages } = useMessages();
  return (
    <header className={scss.listHead}>
      <div className={scss.title}>
        <h2>{isLoading ? messages.label.loading : title}</h2>
      </div>
      {
        children
        && (
          <div className={scss.actions}>
            {children}
          </div>
        )
      }
    </header>
  );
}

export default ListHead;
