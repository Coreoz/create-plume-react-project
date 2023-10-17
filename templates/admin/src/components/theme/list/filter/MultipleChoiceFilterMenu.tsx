import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import React from 'react';
import useMessages from '../../../../i18n/hooks/messagesHook';
import {
  MultipleChoiceObjectFilterMenuProps,
  MultipleChoiceRawFilterMenuProps,
  ObjectFilterProps, RawFilterProps,
} from '../../../../lib/plume-admin-theme/list/filter/FilterProps';

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
  }: MultipleChoiceRawFilterMenuProps,
) {
  const { messages } = useMessages();
  const CHECK_BOX_SIZE: 'small' = 'small';

  return (
    <div className="filter-menu-container">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <h2>{(messages.filter as any)[filterMenuKey].title}</h2>
      <div className="filters">
        {
          filters.map((filterPossibility: RawFilterProps) => (
            <FormGroup key={filterPossibility.filterKey} className="filter">
              <span className="filter-title">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(messages.filter as any)[filterMenuKey][filterPossibility.filterKey]}
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
            </FormGroup>
          ))
        }
      </div>
    </div>
  );
}

export default (MultipleChoiceFilterMenu);

/**
 * MultipleChoiceObjectFilterMenu generates filters for a give object type
 * @param filterMenuKey the key in translation file to be used
 * @param onFilterValueClicked function executed when a checkbox is clicked
 * @param filters The filters for the given type.
 *                Each filter must contain a key extractor of the given object
 *                Each filter must contain a key filter for identification
 * @param rawList the whole given type list to be filtered
 * @param selectedValues the map of the current selected values by key filter
 */
export function MultipleChoiceObjectFilterMenu<T>(
  {
    filterMenuKey,
    onFilterValueClicked,
    filters,
    rawList,
    selectedValues,
  }: MultipleChoiceObjectFilterMenuProps<T>,
) {
  return (
    <MultipleChoiceFilterMenu
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
  );
}