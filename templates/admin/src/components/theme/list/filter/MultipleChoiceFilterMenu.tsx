import { Checkbox, FormControlLabel } from '@mui/material';
import React from 'react';
import {
  MultipleChoiceRawFilterMenuProps,
} from '../../../../lib/plume-admin-theme/list/filter/FilterProps';
import useMessages from '../../../../i18n/hooks/messagesHook';

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
    filterMenuKey, possibleValues, onFilterValueClicked, selectedValues,
  }: MultipleChoiceRawFilterMenuProps,
) {
  const { messages } = useMessages();
  const CHECK_BOX_SIZE = 'small';

  return (
    <div className="filter-menu-container">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <h2>{(messages.filter as any)[filterMenuKey]?.title}</h2>
      <div className="filters">
        <div key={filterMenuKey} className="filter">
              <span className="filter-title">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(messages.filter as any)[filterMenuKey]?.[filterMenuKey]}
              </span>
              {
                  possibleValues
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
      </div>
    </div>
  );
}

export default (MultipleChoiceFilterMenu);
