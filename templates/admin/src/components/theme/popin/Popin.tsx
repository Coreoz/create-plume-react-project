import React from 'react';
import { ActionButton, ActionsContainer } from '../action/Actions';
import ActionStyle from '../../../lib/plume-admin-theme/action/ActionStyle';
import { PopinCloseWithoutSavingProps, PopinProps } from '../../../lib/plume-admin-theme/popin/PopinProps';
import { Panel } from '../layout/Panel';
import useMessages from '../../../i18n/hooks/messagesHook';

export function Popin({
  children, zIndex, height, width,
}: PopinProps) {
  return (
    <div className="popin" style={{ zIndex: zIndex ?? 100 }}>
      <div className="popin-container" style={{ height, width }}>
        {children}
      </div>
    </div>
  );
}

export function PopinCloseWithoutSaving(
  { confirmCloseWithoutSaving, closeWithoutSavingAction }: PopinCloseWithoutSavingProps,
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
