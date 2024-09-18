import { FormEventHandler, FormHTMLAttributes } from 'react';
import {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler, UseFormReturn,
} from 'react-hook-form';

export type FormContainerProps<TFieldValues extends FieldValues = FieldValues> = {
  onSuccess?: SubmitHandler<TFieldValues>,
  onError?: SubmitErrorHandler<TFieldValues>,
  FormProps?: FormHTMLAttributes<HTMLFormElement>,
  handleSubmit?: FormEventHandler<HTMLFormElement>,
  formContext?: UseFormReturn<TFieldValues>,
};
