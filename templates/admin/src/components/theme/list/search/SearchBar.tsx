import { Icon } from '@mui/material';
import React, { MouseEvent, useRef } from 'react';
import useMessages from '../../../../i18n/hooks/messagesHook';
import {
  SearchBarProps,
} from '../../../../lib/plume-admin-theme/list/search/SearchProps';
import useToggle from '../../../../lib/react-hook-toggle/ReactHookToggle';

/**
 * Creates a text input in which you can add a contextual menu for more filters
 * @param onSearch callback when a search is triggered
 * @param placeHolder
 * @param children an optional contextual menu
 */
function SearchBar({ onSearch, placeHolder, children }: SearchBarProps) {
  const { messages } = useMessages();
  const anchorEl: React.MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);
  const wrapperRef: React.MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);

  const [displayMoreOptions, toggleDisplayMoreOptions] = useToggle(false);

  const handleClickOutside = (event: MouseEvent<HTMLDivElement>) => {
    if (!(wrapperRef.current && !wrapperRef?.current?.contains(event.target as Node))) {
      return;
    }
    toggleDisplayMoreOptions();
  };

  return (
    <div className="advanced-search-bar">
      <div className="search-bar-container" ref={anchorEl}>
        <Icon className="search-icon">search</Icon>
        <input
          type="search"
          className="search-bar"
          placeholder={placeHolder ?? messages.action.search}
          onChange={onSearch}
        />
        {
          !!children
          && (
            <button
              type="button"
              onClick={toggleDisplayMoreOptions}
            >
              {messages.label.more_options}
            </button>
          )
        }
      </div>
      {
        displayMoreOptions
        && (
          <>
            <div aria-hidden className="more-options-backdrop" onClick={handleClickOutside} />
            <div className="more-options-container" ref={wrapperRef}>
              {children}
            </div>
          </>
        )
      }
    </div>
  );
}

export default (SearchBar);
