import { InputProps } from '@mui/material';
import { FieldError } from 'react-hook-form';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';

type DataTest = {
  dataTestId?: string, // used to select element in Jest tests
}

type BaseInputProps = {
  name: string,
  disabled?: boolean,
  label?: string,
  rules?: Exclude<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>,
  placeholder?: string,
  errorMessageMapping?: (error: FieldError) => string | undefined,
};

export type InputTextProps = BaseInputProps & DataTest & {
  type?: string,
  autoComplete?: string,
  multiline?: boolean,
  rows?: number,
  InputProps?: Partial<InputProps>,
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
