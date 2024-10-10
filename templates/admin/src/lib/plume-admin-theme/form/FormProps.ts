import { FormEventHandler, FormHTMLAttributes, PropsWithChildren } from 'react';
import {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler, UseFormReturn,
} from 'react-hook-form';

export type FormContainerProps<TFieldValues extends FieldValues = FieldValues> = PropsWithChildren<{
  onSuccess?: SubmitHandler<TFieldValues>,
  onError?: SubmitErrorHandler<TFieldValues>,
  FormProps?: FormHTMLAttributes<HTMLFormElement>,
  handleSubmit?: FormEventHandler<HTMLFormElement>,
  formContext?: UseFormReturn<TFieldValues>,
}>;
