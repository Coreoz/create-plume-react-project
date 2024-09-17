import useMessages, { Messages } from '@i18n/hooks/messagesHook';
import classNames from '@lib/class-names/ClassNames';
import { FilterInputSearchProps } from '@lib/plume-search/filters/FilterTypes';
import {
  Button, Icon, IconButton, InputAdornment, Popover, TextField,
} from '@mui/material';
import React, { useRef, useState } from 'react';

import scss from './filter-input-search.module.scss';
import FilterInputSearchOptions from './FilterInputSearchOptions';

function FilterInputSearch({
  value,
  onChange,
  onClear,
  className,
  InputProps,
  children,
}: FilterInputSearchProps) {
  const anchorEl: React.MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);

  const [displayMoreOptions, setDisplayMoreOptions] = useState<boolean>(false);
  const { messages }: Messages = useMessages();
  return (
    <div className={scss.filterInputSearch}>
      <TextField
        type="search"
        className={classNames(className, scss.filterInputContainer)}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        ref={anchorEl}
        InputProps={{
          className: classNames(scss.filterInput, { [scss.filterInputNoOptions]: !children }),
          placeholder: messages.action.search,
          startAdornment: (
            <InputAdornment position="start">
              <Icon>search</Icon>
            </InputAdornment>
          ),
          endAdornment: (
            value && (
              <InputAdornment position="end">
                <IconButton onClick={() => onClear?.()}><Icon>close</Icon></IconButton>
              </InputAdornment>
            )
          ),
          ...(InputProps ?? {}),
        }}
      />
      {
        children
        && (
          <>
            <Button
              onClick={() => setDisplayMoreOptions(true)}
              variant="text"
              className={scss.endButton}
              disableElevation
            >
              {messages.label.more_options}
            </Button>
            <Popover
              open={displayMoreOptions}
              anchorEl={anchorEl.current}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              onClose={() => setDisplayMoreOptions(false)}
            >
              <FilterInputSearchOptions>
                {children}
              </FilterInputSearchOptions>
            </Popover>
          </>
        )
      }
    </div>
  );
}

export default FilterInputSearch;
