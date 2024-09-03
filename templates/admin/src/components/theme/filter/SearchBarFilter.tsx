import useMessages, { Messages } from '@i18n/hooks/messagesHook';
import { SearchBarFilterProps } from '@lib/plume-filters/FilterTypes';
import {
  Icon, IconButton, InputAdornment, TextField,
} from '@mui/material';
import React from 'react';

function SearchBarFilter({
  value,
  onChange,
  onClear,
  className,
  InputProps,
}: SearchBarFilterProps) {
  const { messages }: Messages = useMessages();
  return (
    <TextField
      type="search"
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      className={className}
      InputProps={{
        placeholder: messages.action.search,
        startAdornment: (
          <InputAdornment position="start">
            <Icon>search</Icon>
          </InputAdornment>
        ),
        endAdornment: value && (
          <InputAdornment position="end">
            <IconButton onClick={() => onClear && onClear()}><Icon>close</Icon></IconButton>
          </InputAdornment>
        ),
        ...(InputProps ?? {}),
      }}
    />
  );
};

export default SearchBarFilter;
