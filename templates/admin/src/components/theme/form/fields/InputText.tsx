import { TextField } from '@mui/material';
import React from 'react';
import { useController } from 'react-hook-form';
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
  shouldUnregister,
  multiline,
  rows,
}: InputTextProps) {
  const fieldId = useNameAsId ? (name ?? 'undefined_input_name') : (id ?? 'undefined_input_id');

  const { field } = useController({
    shouldUnregister,
    name: fieldId,
    control,
    rules,
    defaultValue: defaultValue || '',
  });

  const onBlurCombined = (value: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    field.onBlur();
    if (onBlur) {
      onBlur(value);
    }
  };

  const onChangeCombined = (value: React.ChangeEvent<HTMLTextAreaElement>) => {
    field.onChange(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <TextField
      className={rules?.required ? 'field-required' : ''}
      label={label}
      type={type}
      name={name}
      variant="filled"
      id={useNameAsId ? name : id}
      autoComplete={autoComplete}
      disabled={disabled ?? false}
      value={field.value}
      inputRef={field.ref}
      onChange={onChangeCombined}
      onBlur={onBlurCombined}
      multiline={multiline}
      rows={rows}
    />
  );
}
