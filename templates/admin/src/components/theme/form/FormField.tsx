import { FormControl, FormHelperText, InputLabel } from '@mui/material';
import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import { get, useFormState } from 'react-hook-form';
import { FormFieldProps } from '../../../lib/plume-admin-theme/form/FormFieldProps';
import { formErrorToMessage } from '../../../lib/plume-form-error-messages/FormErrorMessages';
import PlumeMessageResolverService from '../../../lib/plume-messages/MessageResolverService';
import useMessagesResolver from '../../../lib/plume-messages/messagesResolveHook';

export default function FormField({
  inputId, label, name, children, errorMessageMapping, useNameAsId, error,
}: FormFieldProps) {
  const fieldId = useNameAsId ? (name ?? 'undefined_input_name') : (inputId ?? 'undefined_input_id');
  const messageResolver = useMessagesResolver(getGlobalInstance(PlumeMessageResolverService));

  const { errors } = useFormState({ name: fieldId });
  const fieldError = error || get(errors, fieldId);

  return (
    <FormControl className="form-control" error={fieldError !== undefined}>
      <InputLabel htmlFor={inputId}>{label}</InputLabel>
      {children}
      {fieldError && (
        <FormHelperText>
          {
            formErrorToMessage(messageResolver.t.bind(messageResolver), fieldError, errorMessageMapping)
          }
        </FormHelperText>
      )}
    </FormControl>
  );
}
