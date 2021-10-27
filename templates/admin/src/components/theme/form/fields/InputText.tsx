import * as React from 'react';
import { Input } from '@mui/material';
import { useController } from 'react-hook-form';
import { InputTextProps } from '../../../../lib/plume-admin-theme/form/FormInputProps';

export default function InputText({
  type = 'text', name, id, useNameAsId, control, rules, disabled, defaultValue, onBlur, autoComplete,
}: InputTextProps) {
  const fieldId = useNameAsId ? (name ?? 'undefined_input_name') : (id ?? 'undefined_input_id');

  const { field } = useController({
    name: fieldId,
    control,
    rules,
    defaultValue: defaultValue || '',
  });

  const onBlurCombined = (value: React.FocusEvent<unknown>) => {
    field.onBlur();
    if (onBlur) {
      onBlur(value);
    }
  };

  return (
    <Input
      type={type}
      name={name}
      id={useNameAsId ? name : id}
      autoComplete={autoComplete}
      disabled={disabled ?? false}
      value={field.value}
      inputRef={field.ref}
      onBlur={onBlurCombined}
      onChange={field.onChange}
    />
  );
}
