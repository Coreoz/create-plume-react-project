import { CheckboxFilterProps } from '@lib/plume-filters/FilterTypes';
import { Checkbox, FormControlLabel } from '@mui/material';
import React from 'react';

function CheckboxFilter(
  {
    label,
    value,
    disabled,
    selected,
    onValueClicked,
    CheckboxProps,
  }: Readonly<CheckboxFilterProps>,
) {
  return (
    <FormControlLabel
      disabled={disabled ?? false}
      label={label}
      control={
        <Checkbox
          {...(CheckboxProps ?? {})}
          value={value}
          checked={selected}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onValueClicked(e.target.checked);
          }}
          disabled={disabled ?? false}
        />
      }
    />
  );
}

export default CheckboxFilter;
