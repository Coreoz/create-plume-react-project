import { Checkbox, FormControlLabel } from '@mui/material';
import React from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import {
  MultipleChoiceObjectFilterMenuProps,
  MultipleChoiceRawFilterMenuProps,
} from '../../../../lib/plume-admin-theme/list/filter/FilterProps';
import useMessagesResolver from '../../../../lib/plume-messages/messagesResolveHook';
import PlumeMessageResolverService from '../../../../lib/plume-messages/MessageResolverService';

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
    filterMenuKey, filterObjectKey, possibleValues, onFilterValueClicked, selectedValues,
  }: MultipleChoiceRawFilterMenuProps,
) {
  const messages = useMessagesResolver(getGlobalInstance(PlumeMessageResolverService));
  const CHECK_BOX_SIZE = 'small';

  return (
    <div key={filterMenuKey} className="filter">
      <span className="filter-title">
        {messages.t(`filter.${filterObjectKey}.${filterMenuKey}`)}
      </span>
      {possibleValues
        .map((value: string) => (
          <FormControlLabel
            key={value}
            label={value}
            control={(
              <Checkbox
                value={value}
                size={CHECK_BOX_SIZE}
                checked={selectedValues?.includes(value) || false}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onFilterValueClicked(filterMenuKey, value, e.target.checked);
                }}
            />
          )}
          />
        ))
      }
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
    filterObjectKey,
    table,
    columnFilters,
  }: MultipleChoiceObjectFilterMenuProps<T>,
) {
  const messages = useMessagesResolver(getGlobalInstance(PlumeMessageResolverService));

  return (
    <div className="filter-menu-container">
      <h2>
              {messages.t(`filter.${filterObjectKey}.title`)}
      </h2>
      <div className="filters">
        {table.getHeaderGroups().map((headerGroup) => (
          headerGroup.headers.map((header) => (
            header.column.getCanFilter() ? (
            <MultipleChoiceFilterMenu
                filterMenuKey={header.column.id}
                filterObjectKey={filterObjectKey}
                onFilterValueClicked={
                    (filterElementKey: string, valueSelected: string, isChecked: boolean) => {
                      if (!isChecked) {
                        header.column.setFilterValue(
                          ((header.column.getFilterValue() as string []) || []
                          )
                            ?.filter((value) => value !== valueSelected));
                      } else {
                        header.column.setFilterValue(
                          [...(header.column.getFilterValue() as string []) || [], valueSelected],
                        );
                      }
                    }}
                selectedValues={columnFilters.find(
                  ((columnFilter) => columnFilter.id === header.column.id),
                )?.value as string[]}
                possibleValues={Array.from(header.column.getFacetedUniqueValues().keys()).sort()}
            />
            ) : <></>
          ))
        ))}
      </div>
    </div>
  );
}
