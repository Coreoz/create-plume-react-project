import { CheckboxFilterProps } from '@lib/plume-search/filters/FilterTypes';
import { Checkbox, FormControlLabel } from '@mui/material';
import React from 'react';

function CheckboxFilter(
  {
    label,
    value,
    disabled = false,
    selected,
    onValueClicked,
    className,
    CheckboxProps,
  }: Readonly<CheckboxFilterProps>,
) {
  return (
    <FormControlLabel
      disabled={disabled}
      label={label}
      className={className}
      control={
        <Checkbox
          {...(CheckboxProps ?? {})}
          value={value}
          checked={selected}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onValueClicked(e.target.checked);
          }}
          disabled={disabled}
        />
      }
    />
  );
}

export default CheckboxFilter;
