import { FocusEventHandler } from 'react';
import { Control } from 'react-hook-form/dist/types/form';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';

export type InputTextProps = {
  type?: string;
  name?: string;
  id?:string;
  useNameAsId?: boolean;
  autoComplete?: string;
  disabled?: boolean;
  defaultValue?: string;
  rules?: Exclude<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  control: Control<any>;
  // focus event
  onBlur?: FocusEventHandler<unknown>;
};

export type InputSelectProps = {
  name: string;
  id?:string;
  required?:boolean;
  useNameAsId?: boolean;
  defaultValue?: string | number;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  control: Control<any>;
  children?: React.ReactNode;
};
