import React from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import { Checkbox, FormControlLabel } from '@mui/material';
import { ListFilterMenuProps } from '../../../lib/plume-admin-theme/list/ListProps';
import MessageService from '../../../i18n/messages/MessageService';

function ListFilterMenu<T>(
  { filteredObjectKey, filterPossibilities, onFilter, activeFilters, rawList }: ListFilterMenuProps<T>
) {
  const messages = getGlobalInstance(MessageService).t();
  const CHECK_BOX_SIZE = 'small';
  const handleFilter = (filterName: string, filterValue: string, isChecked: boolean) => {
    const filterChoice = filterPossibilities[filterName];
    if (!filterChoice) {
      return;
    }
    onFilter(filterChoice, filterValue, isChecked);
  };

  return (
    <div className="list-filter-menu">
      <h2>{messages['user.filter.title']}</h2>
      <div className="list-filters">
        {
          rawList
          && (
            Object.entries(filterPossibilities).map(([key, filterPossibility]) => (
              <div key={key} className="filter">
                <span className="filter-title">{messages[`${filteredObjectKey}.filter.${filterPossibility.filterKey}`]}</span>
                {
                  Array.from(new Set<string>([...rawList.map(filterPossibility.keyExtractor)]))
                    .map((value: string) => (
                      <FormControlLabel
                        key={value}
                        label={value}
                        control={(
                          <Checkbox
                            value={value}
                            size={CHECK_BOX_SIZE}
                            checked={activeFilters.get(key)?.includes(value) || false}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              handleFilter(key, value, e.target.checked);
                            }}
                          />
                        )}
                      />
                    ))
                }
              </div>
            ))
          )
        }
      </div>
    </div>
  )
}

export default (ListFilterMenu);

