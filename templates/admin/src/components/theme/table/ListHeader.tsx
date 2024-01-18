import React from 'react';
import PlumeAdminTheme from '../../../lib/plume-admin-theme/PlumeAdminTheme';
import {
  ListHeaderProps,
} from '../../../lib/plume-admin-theme/table/ListProps';
import usePlumeTheme from '../hooks/themeHook';

function ListHeader({ listTitle, sortConfiguration }: ListHeaderProps) {
  const theme: PlumeAdminTheme = usePlumeTheme();
  return (
    <div className="list-elements-heading">
      {
        listTitle
        && (
          <h2>{listTitle}</h2>
        )
      }
      {
        sortConfiguration?.defaultSort
        && (
          <theme.sortMenu
            messageKey={sortConfiguration.messageKey}
            defaultSort={sortConfiguration.defaultSort}
            sortPossibilities={sortConfiguration.sortPossibilities}
            onSort={sortConfiguration.onSort}
          />
        )
      }
    </div>
  );
}

export default (ListHeader);
