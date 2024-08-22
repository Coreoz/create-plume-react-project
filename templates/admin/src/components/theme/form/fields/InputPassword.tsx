import { InputPasswordProps } from '@lib/plume-admin-theme/form/FormInputProps';
import { Icon, IconButton, InputAdornment } from '@mui/material';
import React from 'react';
import useToggle from '@lib/react-hook-toggle/ReactHookToggle';
import InputText from './InputText';

function InputPassword({
  label,
  name,
  rules,
  autoComplete,
  errorMessageMapping,
}: InputPasswordProps) {
  const [showPassword, toggleShowPassword] = useToggle(false);
  return (
    <InputText
      label={label}
      type={showPassword ? 'text' : 'password'}
      name={name}
      autoComplete={autoComplete}
      rules={rules}
      errorMessageMapping={errorMessageMapping}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={toggleShowPassword}
              onTouchStart={toggleShowPassword}
              onTouchEnd={toggleShowPassword}
              onMouseDown={toggleShowPassword}
            >
              {
                showPassword
                  ? <Icon>visibility_off</Icon>
                  : <Icon>visibility</Icon>
              }
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default InputPassword;
