import useMessages from '@i18n/hooks/messagesHook';
import {
  PopinCloseWithoutSavingProps,
  PopinProps,
} from '@lib/plume-admin-theme/popin/PopinProps';
import React from 'react';
import ActionStyle from '../../../lib/plume-admin-theme/action/ActionStyle';
import { ActionButton, ActionsContainer } from '../action/Actions';
import { Panel } from '../layout/Panel';

import scss from './popin.module.scss';

export function Popin({
  children, zIndex, height, width,
}: PopinProps) {
  return (
    <div className={scss.popin} style={{ zIndex: zIndex ?? 100 }}>
      <div className={scss.popinContainer} style={{ height, width }}>
        {children}
      </div>
    </div>
  );
}

export function PopinCloseWithoutSaving(
  {
    confirmCloseWithoutSaving,
    closeWithoutSavingAction,
  }: PopinCloseWithoutSavingProps,
) {
  const { messages } = useMessages();

  return confirmCloseWithoutSaving.shouldAskConfirmation
    ? (
      <Popin zIndex={101}>
        <Panel>
          {messages.message.unsaved_data}
        </Panel>
        <ActionsContainer>
          <ActionButton
            style={ActionStyle.DANGER}
            onClick={confirmCloseWithoutSaving.confirm(closeWithoutSavingAction)}
          >
            {messages.action.close_without_saving}
          </ActionButton>
          <ActionButton
            style={ActionStyle.SECONDARY}
            onClick={confirmCloseWithoutSaving.reset}
          >
            {messages.action.keep_editing}
          </ActionButton>
        </ActionsContainer>
      </Popin>
    )
    : null;
}
