import React from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import { FormControl, FormHelperText, InputLabel } from '@mui/material';
import { FormFieldProps } from '../../../lib/plume-admin-theme/form/FormFieldProps';
import { formErrorToMessage } from '../../../lib/plume-form-error-messages/FormErrorMessages';
import PlumeMessageResolverService from '../../../lib/plume-messages/MessageResolverService';
import useMessagesResolver from '../../../lib/plume-messages/messagesResolveHook';

export default function FormField({
  inputId, label, error, children, errorMessageMapping,
}: FormFieldProps) {
  const messageResolver = useMessagesResolver(getGlobalInstance(PlumeMessageResolverService));

  return (
    <FormControl className="form-control" error={error !== undefined}>
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
