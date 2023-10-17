import React from 'react';
import { SelectElement } from 'react-hook-form-mui';
import {
  InputSelectProps,
} from '../../../../lib/plume-admin-theme/form/FormInputProps';

export default function InputSelect(
  {
    name,
    id,
    label,
    options,
    disabled,
    useNameAsId,
    defaultValue,
    control,
    required,
    onBlur,
    onChange,
  }: InputSelectProps) {
  const fieldId: string = useNameAsId ? (name ?? 'undefined_input_name') : (id ?? 'undefined_input_id');

  return (
    <SelectElement
      className={required ? 'field-required' : ''}
      control={control}
      label={label}
      name={fieldId}
      variant="filled"
      id={fieldId}
      options={options}
      valueKey="value"
      labelKey="label"
      defaultValue={defaultValue}
      required={required}
      disabled={disabled ?? false}
      onBlur={onBlur}
      onChange={onChange}
      // disable FormHelper
      parseError={() => ''}
    />
  );
}
