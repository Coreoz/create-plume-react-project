import React, { PropsWithChildren } from 'react';
import { FilterMenuProps } from '@lib/plume-search/filters/FilterTypes';
import { Icon, IconButton, Tooltip } from '@mui/material';
import useMessages, { Messages } from '@i18n/hooks/messagesHook';
import classNames from '@lib/class-names/ClassNames';

import scss from './filter-menu.module.scss';

type FilterResetButtonProps = {
  onReset: () => void,
  className?: string,
};

function FilterResetButton(
  {
    className,
    onReset,
  }: Readonly<FilterResetButtonProps>,
) {
  const { messages }: Messages = useMessages();
  return (
    <div className={classNames(scss.filterResetButton, className)}>
      <Tooltip title={messages.filters.reset} placement="right">
        <IconButton onClick={onReset}>
          <Icon>restart_alt</Icon>
        </IconButton>
      </Tooltip>
    </div>
  );
}

export function FilterMenuHead(
  { title, onResetFilters }: Readonly<FilterMenuProps>,
) {
  return (
    <header>
      <h2>{title}</h2>
      {
        onResetFilters
        && (
          <FilterResetButton onReset={onResetFilters} />
        )
      }
    </header>
  );
}

export default function FilterMenu({ title, onResetFilters, children }: Readonly<PropsWithChildren<FilterMenuProps>>) {
  return (
    <div className={scss.filterMenuContainer}>
      <FilterMenuHead
        title={title}
        onResetFilters={onResetFilters}
      />
      <div className={scss.filters}>
        {children}
      </div>
    </div>
  );
}
