import useFormErrorParser
  from '@components/theme/form/hooks/FormErrorParserHook';
import React from 'react';
import { SelectElement } from 'react-hook-form-mui';
import {
  InputSelectProps,
} from '@lib/plume-admin-theme/form/FormInputProps';

import scss from './form-input.module.scss';

export default function InputSelect(
  {
    name,
    label,
    options,
    disabled,
    required,
    errorMessageMapping,
  }: InputSelectProps) {
  const { parseError } = useFormErrorParser({ errorMapping: errorMessageMapping });
  return (
    <SelectElement
      className={scss.formControl}
      label={label}
      name={name}
      variant="filled"
      id={name}
      options={options}
      valueKey="value"
      labelKey="label"
      required={required}
      disabled={disabled ?? false}
      parseError={parseError}
    />
  );
}
