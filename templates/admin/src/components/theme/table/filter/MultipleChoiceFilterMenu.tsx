import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { ColumnFilter } from '@tanstack/react-table';
import React from 'react';
import useMessages from '../../../../i18n/hooks/messagesHook';
import {
  FilterProps,
  FilterMenuProps,
} from '../../../../lib/plume-admin-theme/table/filter/FilterProps';

/**
 * Component to display vertical checkboxes filters on the side of search results
 * @param filterMenuKey the key in translation file to be used
 * @param filters The filters to be displayed.
 *                Each filter must contain possible values
 *                Each filter must contain a key filter for identification
 * @param onFilterValueClicked function executed when a checkbox is clicked
 * @param selectedValues the map of the current selected values by key filter
 */
function MultipleChoiceFilterMenu(
  {
    filterMenuKey, filters, onFilterValueClicked, selectedValues,
  }: FilterMenuProps,
) {
  const { messages } = useMessages();
  const CHECK_BOX_SIZE: 'small' = 'small';

  const currentSelectedValue = (key: string): ColumnFilter | undefined => selectedValues.find((col: ColumnFilter) => col.id === key);

  const computeNewFilter = (
    value: string,
    filterKey: string,
    check: boolean,
    currentFilterValue: string[],
  ) => {
    const valuesWithoutCurrent: string[] = currentFilterValue.filter((filterValue: string) => filterValue !== value);
    if (!check && valuesWithoutCurrent.length === 0) {
      // if not checked and no values remaining for the column, then we remove it
      return selectedValues.filter((sv: ColumnFilter) => sv.id !== filterKey);
    }
    if (!check) {
      // if not checked and values remaining for the column, then we just remove the value
      return [
        ...selectedValues.filter((sv: ColumnFilter) => sv.id !== filterKey),
        {
          id: filterKey,
          value: valuesWithoutCurrent,
        },
      ]
    }
    // otherwise, adding value to the current column filter
    return [
      ...selectedValues.filter((sv: ColumnFilter) => sv.id !== filterKey),
      {
        id: filterKey,
        value: [
          ...valuesWithoutCurrent,
          value
        ],
      },
    ]
  }

  return (
    <div className="filter-menu-container">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <h2>{(messages.filter as any)[filterMenuKey].title}</h2>
      <div className="filters">
        {
          filters.map((filterPossibility: FilterProps) => (
            <FormGroup key={filterPossibility.filterKey} className="filter">
              <span className="filter-title">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(messages.filter as any)[filterMenuKey][filterPossibility.filterKey]}
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
                              onFilterValueClicked(computeNewFilter(value, filterPossibility.filterKey, e.target.checked, currentFilterValue));
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
