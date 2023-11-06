import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { ColumnFilter } from '@tanstack/react-table';
import React from 'react';
import useMessages from '../../../../i18n/hooks/messagesHook';
import {
  FilterProps,
  FilterMenuProps,
} from '../../../../lib/plume-admin-theme/table/filter/FilterProps';
import { computeFilterValue } from './SearchFilters';

/**
 * Component to display vertical checkboxes filters on the side of search results
 * @param messageKey the key in translation file to be used
 * @param filters The filters to be displayed.
 *                Each filter must contain possible values
 *                Each filter must contain a key filter for identification
 * @param onFilterValueClicked function executed when a checkbox is clicked
 * @param selectedValues the map of the current selected values by key filter
 */
function MultipleChoiceFilterMenu(
  {
    messageKey, filters, onFilterValueClicked, selectedValues,
  }: FilterMenuProps,
) {
  const { messages } = useMessages();
  const CHECK_BOX_SIZE: 'small' = 'small';

  const currentSelectedValue = (key: string): ColumnFilter | undefined => selectedValues.find((col: ColumnFilter) => col.id === key);

  return (
    <div className="filter-menu-container">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <h2>{(messages.filter as any)[messageKey].title}</h2>
      <div className="filters">
        {
          filters.map((filterPossibility: FilterProps) => (
            <FormGroup key={filterPossibility.filterKey} className="filter">
              <span className="filter-title">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(messages.filter as any)[messageKey][filterPossibility.filterKey]}
              </span>
              {
                Array.from(new Set<string>([...filterPossibility.possibleValues]))
                  .map((value: string) => {
                    const currentFilterValue = ((currentSelectedValue(filterPossibility.filterKey)?.value ?? []) as string[])
                      .flatMap((filtered: string) => filtered);
                    return (
                      <FormControlLabel
                        key={value}
                        label={value}
                        control={(
                          <Checkbox
                            value={value}
                            size={CHECK_BOX_SIZE}
                            checked={currentFilterValue.includes(value)}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              onFilterValueClicked(computeFilterValue(value, filterPossibility.filterKey, e.target.checked, currentFilterValue, selectedValues));
                            }}
                          />
                        )}
                      />
                    );
                  })
              }
            </FormGroup>
          ))
        }
      </div>
    </div>
  );
}

export default (MultipleChoiceFilterMenu);
