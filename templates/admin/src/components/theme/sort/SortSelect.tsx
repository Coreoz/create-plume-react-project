import PlumeMessageResolver from '@lib/plume-messages/MessageResolver';
import PlumeMessageResolverService from '@lib/plume-messages/MessageResolverService';
import useMessagesResolver from '@lib/plume-messages/messagesResolveHook';
import { SortSelectProps, SortOption } from '@lib/plume-search/sorts/SortTypes';
import {
  Icon,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';

import scss from './sort-select.module.scss';

const makeKey = <S extends string>(sortOption: SortOption<S>): string => (
  `${sortOption.id.toLowerCase()}_${sortOption.desc ? 'desc' : 'asc'}`
);

const unmakeKey = <S extends string>(sort: string): SortOption<S> => {
  const valueSplit: string[] = sort.split('_');
  const label: string = valueSplit.slice(0, valueSplit.length - 1).join('_').toUpperCase();
  const isDesc: boolean = valueSplit[valueSplit.length - 1] === 'desc';
  return {
    id: label as S,
    desc: isDesc,
  };
};

/**
 * Creates a Select input that displays all the sort possibilities available
 * @param messageKey message key of the menu
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
  }: SortSelectProps<S>,
) {
  const messages: PlumeMessageResolver = useMessagesResolver(getGlobalInstance(PlumeMessageResolverService));

  const isCurrentlySelected = (sortElement: SortOption<S>) => (
    sort.id === sortElement.id && sort.desc === sortElement.desc
  );

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

  return (
    <div className={scss.sortSelectContainer}>
      <Icon>sort</Icon>
      <Select
        className={scss.sortSelect}
        value={makeKey(sort)}
        onChange={(event: SelectChangeEvent<string>) => handleSortingBar(event)}
        IconComponent={(iconProps: { className: string }) => <Icon className={iconProps.className}>expand_more</Icon>}
        SelectDisplayProps={{
          className: scss.select,
        }}
      >
        {
          sortPossibilities
            .sort((sortElement: SortOption<S>) => (
              isCurrentlySelected(sortElement) ? -1 : 0
            ))
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
