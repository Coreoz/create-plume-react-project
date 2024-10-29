import useMessages from '@i18n/hooks/messagesHook';
import classNames from '@lib/class-names/ClassNames';
import ActionStyle from '@lib/plume-admin-theme/action/ActionStyle';
import { DrawerProps } from '@lib/plume-admin-theme/drawer/DrawerProps';
import { Drawer as MaterialDrawer, Icon } from '@mui/material';
import React from 'react';
import { ActionButton, ActionsContainer } from '../action/Actions';

import scss from './drawer.module.scss';

export default function Drawer(
  {
    title,
    children,
    isOpen,
    onClose,
    className,
    anchor = 'right',
    width = 50,
  }: DrawerProps,
) {
  const { messages } = useMessages();

  return (
    <MaterialDrawer
      anchor={anchor}
      open={isOpen}
      onClose={onClose}
      className={classNames(scss.drawerContainer, className)}
      PaperProps={{
        sx: { width: `${width}%` },
      }}
    >
      <div className={scss.drawer}>
        <div className={scss.drawerHeader}>
          <ActionsContainer className={scss.drawerButtonContainer}>
            <ActionButton
              onClick={onClose}
              style={ActionStyle.SECONDARY}
              variant="outlined"
            >
              <Icon>chevron_left</Icon>
              {messages.action.close}
            </ActionButton>
          </ActionsContainer>
          <div className={scss.drawerTitleContainer}>
            <h1>{title ?? ''}</h1>
          </div>
          <div />
        </div>
        <div className={scss.drawerContent}>
          {children}
        </div>
      </div>
    </MaterialDrawer>
  );
}
