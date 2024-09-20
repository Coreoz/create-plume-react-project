import classNames from '@lib/class-names/ClassNames';
import { ListItemAction, ListItemProps } from '@lib/plume-admin-theme/list/ListProps';
import { Icon, IconButton } from '@mui/material';
import React from 'react';
import { ActionsContainer } from '../action/Actions';

import scss from './list.module.scss';

function ListItem(
  {
    className,
    onClick,
    actions = [],
    children,
  }: Readonly<ListItemProps>,
) {
  return (
    <div
      aria-hidden="true"
      className={classNames(scss.listItem, { [scss.listItemClickable]: !!onClick }, className)}
      onClick={() => onClick?.()}
      role={onClick ? 'button' : 'presentation'}
    >
      {children}
      {
        (actions?.length > 0)
        && (
          <ActionsContainer className={scss.actions}>
            {
              actions.map((action: ListItemAction) => (
                <IconButton
                  key={action.label}
                  title={action.label}
                  onClick={(event: React.MouseEvent<HTMLButtonElement> | undefined) => {
                    event?.stopPropagation();
                    action.onClick();
                  }}
                >
                  <Icon>{action.icon}</Icon>
                </IconButton>
              ))
            }
          </ActionsContainer>
        )
      }
    </div>
  );
}

export default ListItem;
