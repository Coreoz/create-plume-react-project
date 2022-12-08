import {
  Icon, MenuItem, Select, SelectChangeEvent,
} from '@mui/material';
import React, { useMemo } from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import { SortListProps } from '../../../../lib/plume-admin-theme/list/sort/SortProps';
import useMessagesResolver from '../../../../lib/plume-messages/messagesResolveHook';
import PlumeMessageResolverService from '../../../../lib/plume-messages/MessageResolverService';

type SortPossibility = {
  label: string,
  value: {
    id: string,
    desc: boolean,
    selectId: string,
  },
};

function SortMenu<T>(
  {
    sortedObjectKey,
    defaultSortKey,
    table,
  }: SortListProps<T>,
) {
  const messages = useMessagesResolver(getGlobalInstance(PlumeMessageResolverService));

  const tableSortPossibilities: SortPossibility[] = useMemo(() => table.getAllColumns().flatMap((column) => {
    if (column.getCanSort()) {
      return [
        {
          label: messages.t(`sort.${sortedObjectKey}.${column.id}_asc`),
          value: {
            id: column.id,
            desc: false,
            selectId: `${column.id}_asc`,
          },
        },
        {
          label: messages.t(`sort.${sortedObjectKey}.${column.id}_desc`),
          value: {
            id: column.id,
            desc: true,
            selectId: `${column.id}_desc`,
          },
        },
      ];
    }
    return [];
  }), [table]);

  return (
    <div className="sort-menu">
      <Icon>sort</Icon>
      <Select
        className="sort-menu-select"
        defaultValue={defaultSortKey}
        onChange={(event: SelectChangeEvent<string>) => {
          const chosenPossibility = tableSortPossibilities.find(
            (possibility) => possibility.value.selectId === event.target.value,
          )?.value;
          table.setSorting(chosenPossibility ? [chosenPossibility] : []);
        }}
        IconComponent={() => <Icon>expand_more</Icon>}
      >
        {
          tableSortPossibilities.map((sortElement) => (
            <MenuItem
              key={sortElement.value.selectId}
              value={sortElement.value.selectId}
            >
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {sortElement.label}
            </MenuItem>
          ))
        }
      </Select>
    </div>
  );
}

export default (SortMenu);
