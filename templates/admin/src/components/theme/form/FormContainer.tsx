import { FormContainerProps } from '@lib/plume-admin-theme/form/FormProps';
import React, { PropsWithChildren } from 'react';
import {
  FieldValues,
  FormContainer as MuiFormContainer,
} from 'react-hook-form-mui';

import './forms.module.scss';

function FormContainer<TFieldValues extends FieldValues = FieldValues>(
  {
    handleSubmit, children, FormProps, formContext, onSuccess, onError,
  }: PropsWithChildren<FormContainerProps<TFieldValues>>,
) {
  return (
    <MuiFormContainer<TFieldValues>
      formContext={formContext}
      onSuccess={onSuccess}
      onError={onError}
      FormProps={FormProps}
      handleSubmit={handleSubmit}
    >
      {children}
    </MuiFormContainer>
  );
}

export default FormContainer;
