import { Checkbox, FormControlLabel } from '@mui/material';
import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import MessageService from '../../../i18n/messages/MessageService';
import {
  ListObjectFiltersProps,
  ListRawFiltersProps,
  ObjectFilterProps
} from '../../../lib/plume-admin-theme/list/ListProps';

export function ListObjectFilters<T>(
  {
    filterMenuKey,
    onFilterValueClicked,
    filters,
    rawList,
    selectedValues
  }: ListObjectFiltersProps<T>
) {
  return (
    <ListFilters
      filterMenuKey={filterMenuKey}
      onFilterValueClicked={onFilterValueClicked}
      filters={
        filters
          .map((o: ObjectFilterProps<T>) => ({
            filterKey: o.filterKey,
            possibleValues: rawList.map(o.keyExtractor),
          }))
      }
      selectedValues={selectedValues}
    />
  )
}

function ListFilters(
  { filterMenuKey, filters, onFilterValueClicked, selectedValues }: ListRawFiltersProps
) {
  const messages = getGlobalInstance(MessageService).t();
  const CHECK_BOX_SIZE = 'small';

  return (
    <div className="list-filter-menu">
      <h2>{(messages['filter'] as any)[filterMenuKey]['title']}</h2>
      <div className="list-filters">
        {
          filters.map((filterPossibility) => (
            <div key={filterPossibility.filterKey} className="filter">
                <span className="filter-title">
                  {(messages['filter'] as any)[filterMenuKey][filterPossibility.filterKey]}
                </span>
              {
                Array.from(new Set<string>([...filterPossibility.possibleValues]))
                  .map((value: string) => (
                    <FormControlLabel
                      key={value}
                      label={value}
                      control={(
                        <Checkbox
                          value={value}
                          size={CHECK_BOX_SIZE}
                          checked={selectedValues.get(filterPossibility.filterKey)?.includes(value) || false}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            onFilterValueClicked(filterPossibility.filterKey, value, e.target.checked);
                          }}
                        />
                      )}
                    />
                  ))
              }
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default (ListFilters);