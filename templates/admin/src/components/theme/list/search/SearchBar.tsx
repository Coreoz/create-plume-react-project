import { Icon } from '@mui/material';
import { getGlobalInstance } from 'plume-ts-di';
import React, { MouseEvent, useRef } from 'react';
import MessageService from '../../../../i18n/messages/MessageService';
import { SearchBarProps } from '../../../../lib/plume-admin-theme/list/search/SearchProps';
import useToggle from '../../../../lib/react-hook-toggle/ReactHookToggle';

function SearchBar({ onSearch, placeHolder, children }: SearchBarProps) {
  const messages = getGlobalInstance(MessageService).t();
  const anchorEl = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

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
