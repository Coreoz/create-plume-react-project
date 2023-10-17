import React from 'react';
import { TextFieldElement } from 'react-hook-form-mui';
import { InputTextProps } from '../../../../lib/plume-admin-theme/form/FormInputProps';

export default function InputText({
  type = 'text',
  label,
  name,
  id,
  useNameAsId,
  control,
  rules,
  disabled,
  defaultValue,
  onChange,
  onBlur,
  autoComplete,
  multiline,
  rows,
}: InputTextProps) {
  const fieldId: string = useNameAsId ? (name ?? 'undefined_input_name') : (id ?? 'undefined_input_id');

  return (
    <TextFieldElement
      className={rules?.required ? 'field-required' : ''}
      control={control}
      label={label}
      type={type}
      name={fieldId}
      variant="filled"
      id={fieldId}
      defaultValue={defaultValue}
      autoComplete={autoComplete}
      validation={rules}
      disabled={disabled ?? false}
      onChange={onChange}
      onBlur={onBlur}
      multiline={multiline}
      rows={rows}
    />
  );
}
