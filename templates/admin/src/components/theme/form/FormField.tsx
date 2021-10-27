import React from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import { FormControl, FormHelperText, InputLabel } from '@mui/material';
import { FormFieldProps } from '../../../lib/plume-admin-theme/form/FormFieldProps';
import { formErrorToMessage } from '../../../lib/plume-form-error-messages/FormErrorMessages';
import PlumeMessageResolver from '../../../lib/plume-messages/MessageResolver';

export default function FormField({
  inputId, label, error, children, errorMessageMapping,
}: FormFieldProps) {
  const messageResolver = getGlobalInstance(PlumeMessageResolver);

  return (
    <FormControl className="form-control" error={error !== undefined}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <InputLabel htmlFor={inputId}>{label}</InputLabel>
      {children}
      {error && (
        <FormHelperText>
          {
            formErrorToMessage(messageResolver.t.bind(messageResolver), error, errorMessageMapping)
          }
        </FormHelperText>
      )}
    </FormControl>
  );
}
