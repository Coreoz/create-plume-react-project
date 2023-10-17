import { FocusEvent, ChangeEvent } from 'react';
import { Control } from 'react-hook-form/dist/types/form';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';

export type InputTextProps = {
  type?: string,
  name?: string,
  id?: string,
  useNameAsId?: boolean,
  autoComplete?: string,
  disabled?: boolean,
  defaultValue?: string,
  rules?: Exclude<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>,
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  control?: Control<any>,
  // focus event
  onBlur?: (event: FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void,
  label?: string,
  placeholder?: string,
  multiline?: boolean,
  rows?: number,
};

export type InputSelectProps = {
  name: string,
  id?: string,
  label?: string,
  required?: boolean,
  useNameAsId?: boolean,
  defaultValue?: string | number,
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  control?: Control<any>,
  options: SelectOptionProps[],
  rules?: Exclude<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>,
  onBlur?: (event: FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
  onChange?: (value: string) => void,
  disabled?: boolean,
};

export type SelectOptionProps = {
  label: string,
  value: string,
};
