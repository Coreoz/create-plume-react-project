import PlumeMessageResolver from '@lib/plume-messages/MessageResolver';
import PlumeMessageResolverService from '@lib/plume-messages/MessageResolverService';
import useMessagesResolver from '@lib/plume-messages/messagesResolveHook';
import { SortOption, SortSelectProps } from '@lib/plume-search/sorts/SortTypes';
import {
  Icon, ListItemText, MenuItem, Select, SelectChangeEvent,
} from '@mui/material';
import { getGlobalInstance } from 'plume-ts-di';
import React, { useMemo } from 'react';

import scss from './sort-select.module.scss';

const makeKey = <S extends string>(sortOption: SortOption<S>): string => (
  `${sortOption.id.toLowerCase()}_${sortOption.desc ? 'desc' : 'asc'}`
);

const unmakeKey = <S extends string>(sort: string): SortOption<S> => {
  const valueSplit: string[] = sort.split('_');
  const label: string = valueSplit.slice(0, valueSplit.length - 1)
    .join('_')
    .toUpperCase();
  const isDesc: boolean = valueSplit[valueSplit.length - 1] === 'desc';
  return {
    id: label as S,
    desc: isDesc,
  };
};

const IconComponent = ({ className }: { className: string }) => <Icon className={className}>expand_more</Icon>;

/**
 * Creates a Select input that displays all the sort possibilities available
 *
 * @param messageKey message key of the menu that is under "sorts" entry in {@link Translations}
 * @param sortPossibilities the sort possibilities {@link SortOption}
 * @param onSort callback when selecting a sort
 * @param sort the current sort selected
 */
function SortSelect<S extends string>(
  {
    messageKey,
    sortPossibilities,
    onSort,
    sort,
  }: Readonly<SortSelectProps<S>>,
) {
  const messages: PlumeMessageResolver = useMessagesResolver(getGlobalInstance(PlumeMessageResolverService));

  const handleSortingBar = (event: SelectChangeEvent<string>) => {
    const sortOption: SortOption<S> = unmakeKey(event.target.value.toString());
    const sortChoice: SortOption<S> | undefined = sortPossibilities.find((element: SortOption<S>) => (
      element.id.localeCompare(sortOption.id) === 0
      && element.desc === sortOption.desc
    ));
    if (!sortChoice) {
      return;
    }
    onSort(sortChoice);
  };

  const sortedList: SortOption<S>[] = useMemo(
    () => [...sortPossibilities].sort((sortElement: SortOption<S>) => (
      sort.id === sortElement.id && sort.desc === sortElement.desc ? -1 : 0
    )),
    [sortPossibilities, sort],
  );

  return (
    <div className={scss.sortSelectContainer}>
      <Icon>sort</Icon>
      <Select
        className={scss.sortSelect}
        value={makeKey(sort)}
        variant="outlined"
        onChange={(event: SelectChangeEvent<string>) => handleSortingBar(event)}
        IconComponent={IconComponent}
        SelectDisplayProps={{
          className: scss.select,
        }}
      >
        {
          sortedList
            .map((sortElement: SortOption<S>) => (
              <MenuItem
                key={makeKey(sortElement)}
                value={makeKey(sortElement)}
                className={scss.item}
              >
                <ListItemText className={scss.itemValue}>
                  {messages.t(`sorts.${messageKey}.${makeKey(sortElement)}`)}
                </ListItemText>
              </MenuItem>
            ))
        }
      </Select>
    </div>
  );
}

export default (SortSelect);
