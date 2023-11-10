import {
  Icon, MenuItem, Select, SelectChangeEvent,
} from '@mui/material';
import { ColumnSort } from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';
import useMessages from '../../../../i18n/hooks/messagesHook';
import {
  SortMenuProps,
} from '../../../../lib/plume-admin-theme/table/sort/SortProps';

type SortPossibility = {
  uniqueKey: string,
  key: string,
  label: string,
  isDesc: boolean,
};

/**
 * Creates a Select input that displays all the sort possibilities available
 * @param messageKey message key of the menu
 * @param sortPossibilities the sort possibilities {@link ColumnSort}
 * @param onSort callback when selecting a sort
 * @param defaultSort the default sort selected
 */
function SortMenu(
  {
    messageKey,
    sortPossibilities,
    onSort,
    defaultSort,
  }: SortMenuProps,
) {
  const { messages } = useMessages();
  // keeping the history of what was selected
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({
    [defaultSort.id]: defaultSort.desc,
  });
  // keeping the current sort as the component is uncontrolled
  const [currentSort, setCurrentSort] = useState<ColumnSort>(defaultSort);

  const defaultSortPossibility: string = useMemo(
    () => `${defaultSort.id}_${defaultSort.desc ? 'desc' : 'asc'}`,
    [],
  );

  /**
   * Duplicate the possibilities so there can be an ASC and DESC sort
   */
  const duplicatedSortPossibilities: SortPossibility[] = useMemo(() => (
    sortPossibilities.flatMap((sortElement: string) => [
      {
        uniqueKey: `${sortElement}_asc`,
        key: sortElement,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        label: (messages.sort as any)[messageKey][`${sortElement}_asc`],
        isDesc: false,
      },
      {
        uniqueKey: `${sortElement}_desc`,
        key: sortElement,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        label: (messages.sort as any)[messageKey][`${sortElement}_desc`],
        isDesc: true,
      },
    ])
  ), []);

  const isCurrentlySelected = (sortElement: SortPossibility) => (
    currentSort.id === sortElement.key && currentSort.desc === sortElement.isDesc
  );

  const handleSortingBar = (event: SelectChangeEvent<string>) => {
    const valueSplit: string[] = event.target.value.toString().split('_');
    const label: string = valueSplit.slice(0, valueSplit.length - 1).join();
    const isDesc: boolean = valueSplit[valueSplit.length - 1] === 'desc';
    const sortChoice: string | undefined = sortPossibilities.find((element: string) => (
      element.toLowerCase().localeCompare(label.toLowerCase()) === 0
    ));
    if (!sortChoice) {
      return;
    }
    setSelected((oldSelected: { [key: string]: boolean }) => ({
      ...oldSelected,
      [sortChoice]: isDesc,
    }));
    setCurrentSort({ id: sortChoice, desc: isDesc });
    onSort({ id: sortChoice, desc: isDesc });
  };

  return (
    <div className="sort-menu">
      <Icon>sort</Icon>
      <Select
        className="sort-menu-select"
        defaultValue={defaultSortPossibility}
        onChange={(event: SelectChangeEvent<string>) => handleSortingBar(event)}
        IconComponent={() => <Icon>expand_more</Icon>}
      >
        {
          duplicatedSortPossibilities
            // filtering values so that only on of each possibility is displayed
            // the chosen one between asc and desc is the one that was not selected the last time
            // also displaying the current chosen filter, in first place
            .filter((sortElement: SortPossibility) => (
              (selected[sortElement.key] ?? false) !== sortElement.isDesc
              || isCurrentlySelected(sortElement)
            ))
            .sort((sortElement: SortPossibility) => (
              isCurrentlySelected(sortElement) ? -1 : 0
            ))
            .map((sortElement: SortPossibility) => (
              <MenuItem
                key={sortElement.uniqueKey}
                value={sortElement.uniqueKey}
              >
                {sortElement.label}
              </MenuItem>
            ))
        }
      </Select>
    </div>
  );
}

export default (SortMenu);
