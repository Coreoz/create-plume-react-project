import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import { ListHeaderProps } from '../../../lib/plume-admin-theme/list/ListProps';
import PlumeAdminTheme from '../../../lib/plume-admin-theme/PlumeAdminTheme';

function ListHeader<T>({ listTitle, tableSorting }: ListHeaderProps<T>) {
  const theme = getGlobalInstance(PlumeAdminTheme);
  return (
    <div className="list-elements-heading">
      {listTitle
        && (
          <h2>{listTitle}</h2>
        )
      }
      {tableSorting
        && (
          <theme.sortMenu
            defaultSortKey={tableSorting.defaultSortKey}
            sortedObjectKey={tableSorting.sortedObjectKey}
            table={tableSorting.table}
          />
        )
      }
    </div>
  );
}

export default (ListHeader);
