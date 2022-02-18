import { Icon, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import MessageService from '../../../i18n/messages/MessageService';
import { ListSortMenuProps } from '../../../lib/plume-admin-theme/list/ListProps';

function ListSortMenu({ sortedObjectKey, sortPossibilities, onSort, defaultSortPossibility }: ListSortMenuProps) {
  const messages = getGlobalInstance(MessageService).t();

  const handleSortingBar = (event: SelectChangeEvent<string>) => {
    const sortChoice = sortPossibilities.filter(
      element => element.sortKey.toLowerCase()
        .localeCompare(event.target.value.toString().toLowerCase())
    )[0];
    if (!sortChoice) {
      return;
    }
    onSort(sortChoice);
  };

  return (
    <div className="list-sort-menu">
      <Icon>sort</Icon>
      <Select
        className="sort-menu"
        defaultValue={defaultSortPossibility.sortKey}
        onChange={(event: SelectChangeEvent<string>) => handleSortingBar(event)}
        IconComponent={() => <Icon>expand_more</Icon>}
      >
        {
          sortPossibilities.map((sortElement) => (
            <MenuItem
              key={sortElement.sortKey}
              value={sortElement.sortKey}
            >
              {(messages['sort'] as any)[sortedObjectKey][sortElement.sortKey.toLowerCase()]}
            </MenuItem>
          ))
        }
      </Select>
    </div>
  )
}

export default (ListSortMenu);

