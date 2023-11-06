import { Icon, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { ColumnSort } from '@tanstack/react-table';
import React, { useMemo } from 'react';
import useMessages from '../../../../i18n/hooks/messagesHook';
import {
  SortMenuProps,
} from '../../../../lib/plume-admin-theme/table/sort/SortProps';

/**
 * Creates a Select input that displays all the sort possibilities available
 * @param messageKey message key of the menu
 * @param sortPossibilities the sort possibilities {@link ColumnSort}
 * @param onSort callback when selecting a sort
 * @param currentSort the current sort selected
 */
function SortMenu(
  {
    messageKey,
    sortPossibilities,
    onSort,
    currentSort,
  }: SortMenuProps,
) {
  const { messages } = useMessages();

  const defaultSortPossibility: ColumnSort = useMemo(() => currentSort, []);

  const currentFilterIsUsed = (key: string) => currentSort.id  === key;

  const handleSortingBar = (event: SelectChangeEvent<string>) => {
    const sortChoice: string | undefined = sortPossibilities.find((element: string) => (
      element.toLowerCase().localeCompare(event.target.value.toString().toLowerCase()) === 0
    ));
    if (!sortChoice) {
      return;
    }
    onSort({ id: sortChoice, desc: currentFilterIsUsed(sortChoice) ? !currentSort.desc : true });
  };

  const selectLabel = (sortElement: string) => {
    // if desc was already selected for the current filter, then asc choice is displayed
    const showAsc = currentFilterIsUsed(sortElement) && currentSort.desc;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (messages.sort as any)[messageKey][`${sortElement}_${showAsc? 'asc' : 'desc'}`]
  }

  return (
    <div className="sort-menu">
      <Icon>sort</Icon>
      <Select
        className="sort-menu-select"
        defaultValue={defaultSortPossibility.id}
        onChange={(event: SelectChangeEvent<string>) => handleSortingBar(event)}
        IconComponent={() => <Icon>expand_more</Icon>}
      >
        {
          sortPossibilities
            .map((sortElement: string) => (
              <MenuItem
                key={sortElement}
                value={sortElement}
              >
                {selectLabel(sortElement)}
              </MenuItem>
            ))
        }
      </Select>
    </div>
  );
}

export default (SortMenu);
