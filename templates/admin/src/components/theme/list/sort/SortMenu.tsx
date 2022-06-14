import {
  Icon,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import MessageService from '../../../../i18n/messages/MessageService';
import {
  SortElementProps,
  SortMenuProps,
} from '../../../../lib/plume-admin-theme/list/sort/SortProps';

function SortMenu(
  {
    sortedObjectKey,
    sortPossibilities,
    onSort,
    defaultSortPossibility,
  }: SortMenuProps,
) {
  const messages = getGlobalInstance(MessageService).t();

  const handleSortingBar = (event: SelectChangeEvent<string>) => {
    const sortChoice = sortPossibilities.find(
      (element: SortElementProps) => element.sortKey.toLowerCase()
        .localeCompare(event.target.value.toString().toLowerCase()) === 0,
    );
    if (!sortChoice) {
      return;
    }
    onSort(sortChoice);
  };

  return (
    <div className="sort-menu">
      <Icon>sort</Icon>
      <Select
        className="sort-menu-select"
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
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {(messages.sort as any)[sortedObjectKey][sortElement.sortKey.toLowerCase()]}
            </MenuItem>
          ))
        }
      </Select>
    </div>
  );
}

export default (SortMenu);
