import React from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import { ListHeaderProps } from '../../../lib/plume-admin-theme/list/ListProps';
import MessageService from '../../../i18n/messages/MessageService';
import PlumeAdminTheme from '../../../lib/plume-admin-theme/PlumeAdminTheme';

function ListHeader({ listLength, sortConfiguration }: ListHeaderProps) {
  const messages = getGlobalInstance(MessageService).t();
  const theme = getGlobalInstance(PlumeAdminTheme);
  return (
    <div className="list-elements-heading">
      <h2>{messages.user.list.count(listLength)}</h2>
      {
        sortConfiguration
        && (
          <theme.sortMenu
            sortedObjectKey={sortConfiguration.sortedObjectKey}
            defaultSortPossibility={sortConfiguration.defaultSortPossibility}
            sortPossibilities={sortConfiguration.sortPossibilities}
            onSort={sortConfiguration.onSort}
          />
        )
      }
    </div>
  )
}

export default (ListHeader);
