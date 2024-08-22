import { InputProps } from '@mui/material';
import { FieldError } from 'react-hook-form';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';

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
  InputProps?: Partial<InputProps> & DataTestIdPropsOverride,
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
