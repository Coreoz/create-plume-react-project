import { MenuItem, TextField } from '@mui/material';
import React from 'react';
import { useController } from 'react-hook-form';
import {
  InputSelectProps,
  SelectOptionProps,
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
  const fieldId = useNameAsId ? (name ?? 'undefined_input_name') : (id ?? 'undefined_input_id');

  const { field } = useController({
    name: fieldId,
    control,
    rules: { required: required ?? false },
    defaultValue: defaultValue || '',
  });

  const onBlurCombined = (value: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    field.onBlur();
    if (onBlur) {
      onBlur(value);
    }
  };

  const onChangeField = (event: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(event);
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <TextField
      className={required ? 'field-required' : ''}
      select
      label={label}
      name={name}
      variant="filled"
      id={useNameAsId ? name : id}
      disabled={disabled ?? false}
      value={field.value}
      inputRef={field.ref}
      onBlur={onBlurCombined}
      onChange={onChangeField}
    >
      {
        React.Children.toArray(
          options?.map((option: SelectOptionProps) => (
            <MenuItem key={`${option.label}-${option.value}`} value={option.value}>
              {option.label}
            </MenuItem>
          )),
        )
      }
    </TextField>
  );
}
