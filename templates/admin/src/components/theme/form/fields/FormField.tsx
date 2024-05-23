import useFormErrorParser
  from '@components/theme/form/hooks/FormErrorParserHook';
import { FormFieldProps } from '@lib/plume-admin-theme/form/FormFieldProps';
import { FormControl, FormHelperText } from '@mui/material';
import {
  FieldError,
  FieldValues,
  get,
  useFormState,
  UseFormStateReturn,
} from 'react-hook-form';

import scss from './form-input.module.scss';

/**
 * FormField should be used in forms created with react-hook-form
 * It replaces the react-hook-form-mui wrapper if the input has not been implemented in the library
 * If you need to create your own input, use this component to wrap it
 */
export default function FormField({
  name, children, errorMessageMapping, error,
}: FormFieldProps) {
  const { parseError } = useFormErrorParser({ errorMapping: errorMessageMapping });

  const { errors }: UseFormStateReturn<FieldValues> = useFormState({ name });
  const fieldError: FieldError | undefined = error || get(errors, name);

  return (
    <FormControl className={scss.formControl} error={fieldError !== undefined}>
      {children}
      {fieldError && (
        <FormHelperText>
          {parseError(fieldError)}
        </FormHelperText>
      )}
    </FormControl>
  );
}
