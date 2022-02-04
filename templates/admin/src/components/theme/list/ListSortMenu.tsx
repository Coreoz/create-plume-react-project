import React from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import { Icon, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { ListSortMenuProps } from '../../../lib/plume-admin-theme/list/ListProps';
import MessageService from '../../../i18n/messages/MessageService';

function ListSortMenu({ sortPossibilities, onSort, defaultSortPossibility }: ListSortMenuProps) {
  const messages = getGlobalInstance(MessageService).t();

  const handleSortingBar = (event: SelectChangeEvent<string>) => {
    const sortChoice = sortPossibilities[event.target.value];
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
          Object.keys(sortPossibilities).map((sortKey) => (
            <MenuItem
              key={sortKey}
              value={sortKey}
            >
              {messages[`user.sort.${sortKey.toLowerCase()}`]}
            </MenuItem>
          ))
        }
      </Select>
    </div>
  )
}

export default (ListSortMenu);

