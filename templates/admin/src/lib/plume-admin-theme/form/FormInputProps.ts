import { ElementType } from 'react';
import {
  BaseTextFieldProps, FilledInputProps, SlotProps,
} from '@mui/material';
import { FieldError, RegisterOptions } from 'react-hook-form';

type DataTestIdPropsOverride = {
  'data-testid'?: string,
};

type BaseInputProps = {
  name: string,
  disabled?: boolean,
  label?: string,
  rules?: Exclude<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>,
  placeholder?: string,
  errorMessageMapping?: (error: FieldError) => string | undefined,
};

export type InputTextProps = BaseInputProps & {
  type?: string,
  autoComplete?: string,
  multiline?: boolean,
  rows?: number,
  InputProps?: SlotProps<ElementType<FilledInputProps>, {}, BaseTextFieldProps> & DataTestIdPropsOverride,
};

export type InputPasswordProps = Omit<InputTextProps, 'type'>;

export type SelectOptionProps = {
  label: string,
  value: string,
};

export type InputSelectProps = BaseInputProps & {
  required?: boolean,
  options: SelectOptionProps[],
};
