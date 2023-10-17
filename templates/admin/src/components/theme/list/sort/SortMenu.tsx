import {
  Icon, MenuItem, Select, SelectChangeEvent,
} from '@mui/material';
import React from 'react';
import useMessages from '../../../../i18n/hooks/messagesHook';
import {
  SortElementProps,
  SortMenuProps,
} from '../../../../lib/plume-admin-theme/list/sort/SortProps';

/**
 * Creates a Select input that displays all the sort possibilities available
 * @param sortedObjectKey message key of the menu
 * @param sortPossibilities the sort possibilities {@link SortElementProps}
 * @param onSort callback when selecting a sort
 * @param defaultSortPossibility
 */
function SortMenu(
  {
    sortedObjectKey,
    sortPossibilities,
    onSort,
    defaultSortPossibility,
  }: SortMenuProps,
) {
  const { messages } = useMessages();

  const handleSortingBar = (event: SelectChangeEvent<string>) => {
    const sortChoice: SortElementProps | undefined = sortPossibilities.find(
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
          sortPossibilities.map((sortElement: SortElementProps) => (
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
