import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import { ListHeaderProps } from '../../../lib/plume-admin-theme/table/ListProps';
import PlumeAdminTheme from '../../../lib/plume-admin-theme/PlumeAdminTheme';

function ListHeader({ listTitle, sortConfiguration }: ListHeaderProps) {
  const theme: PlumeAdminTheme = getGlobalInstance(PlumeAdminTheme);
  return (
    <div className="list-elements-heading">
      {
        listTitle
        && (
          <h2>{listTitle}</h2>
        )
      }
      {
        sortConfiguration
        && (
          <theme.sortMenu
            sortedObjectKey={sortConfiguration.sortedObjectKey}
            currentSort={sortConfiguration.currentSort}
            sortPossibilities={sortConfiguration.sortPossibilities}
            onSort={sortConfiguration.onSort}
          />
        )
      }
    </div>
  );
}

export default (ListHeader);
