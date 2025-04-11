import useMessages, { Messages } from '@i18n/hooks/messagesHook';
import classNames from '@lib/class-names/ClassNames';
import { FilterInputSearchProps } from '@lib/plume-search/filters/FilterTypes';
import {
  Button, Icon, IconButton, InputAdornment, Popover, TextField,
} from '@mui/material';
import { RefObject, useRef, useState } from 'react';

import scss from './filter-input-search.module.scss';
import FilterInputSearchOptions from './FilterInputSearchOptions';

/**
 * Create a text input used for research purposes
 *
 * @param value the value of the text input
 * @param onChange function called when the input is updated
 * @param onClear callback when the input is cleared
 * @param className the input classname
 * @param InputProps optional additional input props
 * @param children optional additional contextual search menu appearing as a button at the end of the input
 */
function FilterInputSearch({
  value,
  onChange,
  onClear,
  className,
  InputProps,
  children,
}: FilterInputSearchProps) {
  const anchorEl: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);

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
        slotProps={{
          input: {
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
          },
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
