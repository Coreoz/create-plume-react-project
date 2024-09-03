import CheckboxFilter from '@components/theme/filter/CheckboxFilter';
import Filter from '@components/theme/filter/Filter';
import RadioFilter from '@components/theme/filter/RadioFilter';
import {
  CheckboxFilterProps,
  FilterGroupOption,
  FilterGroupProps,
  RadioFilterProps,
} from '@lib/plume-filters/FilterTypes';
import React from 'react';

import scss from './filter-menu.module.scss';

function FilterGroup(
  {
    messageKey,
    info,
    onChange,
    disabled,
    selectedValues,
    type,
    possibleValues,
  }: Readonly<FilterGroupProps>,
) {
  const onValueClicked = (
    value: string,
    check: boolean,
  ) => {
    if (!check) {
      // if not checked and values remaining for the column, then we just remove the value
      onChange((selectedValues ?? []).filter((curr: string) => curr !== value));
      return;
    }
    // otherwise, adding value to the current column filter
    onChange((selectedValues ?? []).concat(value));
  };

  const onSingleValueClicked = (
    value: string,
    check: boolean,
  ) => {
    if (!check) {
      onChange([]);
      return;
    }
    onChange([value]);
  };

  return (
    <Filter messageKey={messageKey} info={info}>
      {
        possibleValues
          .map((value: FilterGroupOption) => (
            type === 'multiple'
              ? (
                <CheckboxFilter
                  key={value.value}
                  label={value.label}
                  value={value.value}
                  disabled={(value.disabled ?? false) || disabled}
                  selected={selectedValues?.includes(value.value) ?? false}
                  onValueClicked={(check: boolean) => onValueClicked(value.value, check)}
                  className={scss.inputFilter}
                  CheckboxProps={(value as CheckboxFilterProps).CheckboxProps}
                />
              ) : (
                <RadioFilter
                  key={value.value}
                  label={value.label}
                  value={value.value}
                  disabled={(value.disabled ?? false) || disabled}
                  selected={selectedValues?.includes(value.value) ?? false}
                  onValueClicked={(check: boolean) => onSingleValueClicked(value.value, check)}
                  className={scss.inputFilter}
                  RadioProps={(value as RadioFilterProps).RadioProps}
                />
              )
          ))
      }
    </Filter>
  );
}

export default FilterGroup;
