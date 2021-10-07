import { NativeSelect } from '@material-ui/core';
import React from 'react';
import { useController } from 'react-hook-form';
import { InputSelectProps } from '../../../../lib/plume-admin-theme/form/FormInputProps';

export default function InputSelect({
  name, id, useNameAsId, defaultValue, control, required, children,
}: InputSelectProps) {
  const fieldId = useNameAsId ? (name ?? 'undefined_input_name') : (id ?? 'undefined_input_id');

  const { field } = useController({
    name: fieldId,
    control,
    rules: { required: required ?? false },
    defaultValue: defaultValue || '',
  });

  return (
    <NativeSelect
      value={field.value}
      inputRef={field.ref}
      onBlur={field.onBlur}
      onChange={field.onChange}
      inputProps={{
        name: useNameAsId ? name : id,
        id: useNameAsId ? name : id,
      }}
    >
      {children}
    </NativeSelect>
  );
}
