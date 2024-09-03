import { RadioFilterProps } from '@lib/plume-filters/FilterTypes';
import { Radio, FormControlLabel } from '@mui/material';
import React from 'react';

function RadioFilter(
  {
    label,
    value,
    disabled,
    selected,
    className,
    onValueClicked,
    RadioProps,
  }: Readonly<RadioFilterProps>,
) {
  return (
    <FormControlLabel
      disabled={disabled ?? false}
      className={className}
      label={label}
      control={
        <Radio
          {...(RadioProps ?? {})}
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

export default RadioFilter;
