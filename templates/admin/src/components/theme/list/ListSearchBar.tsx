import React, { useRef } from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import { Icon } from '@mui/material';
import MessageService from '../../../i18n/messages/MessageService';
import useToggle from '../../../lib/react-hook-toggle/ReactHookToggle';
import { ListSearchBarProps } from '../../../lib/plume-admin-theme/list/ListProps';

function ListSearchBar({ onSearch, placeHolder, children }: ListSearchBarProps) {
  const messages = getGlobalInstance(MessageService).t();
  const anchorEl = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [displayMoreOptions, toggleDisplayMoreOptions] = useToggle(false);

  const handleClickOutside = (event: HTMLDivElement | any) => {
    if (!(wrapperRef.current && !wrapperRef?.current?.contains(event.target))) {
      return;
    }
    toggleDisplayMoreOptions();
  };

  return (
    <div className="list-search-bar">
      <div className="search-bar-container" ref={anchorEl}>
        <Icon className="search-icon">search</Icon>
        <input
          type="search"
          className="search-bar"
          placeholder={placeHolder ? messages[placeHolder] : messages['action.search']}
          onChange={onSearch}
        />
        {!!children && (
          <button
            type="button"
            onClick={toggleDisplayMoreOptions}
          >
            {messages['label.more-options']}
          </button>
        )}
      </div>
      {
        displayMoreOptions
        && (
          <div aria-hidden className="more-options-backdrop" onClick={handleClickOutside}>
            <div className="more-options-container" ref={wrapperRef}>
              {children}
            </div>
          </div>
        )
      }
    </div>
  )
}

export default (ListSearchBar);

