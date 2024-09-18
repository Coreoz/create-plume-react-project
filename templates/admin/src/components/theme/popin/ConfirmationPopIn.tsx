import {
  ConfirmationPopInProps,
} from '@lib/plume-admin-theme/popin/PopinProps';
import React from 'react';
import ActionStyle from '../../../lib/plume-admin-theme/action/ActionStyle';
import { ActionButton, ActionsContainer } from '../action/Actions';
import Popin from './Popin';

import scss from './popin.module.scss';

export default function ConfirmationPopIn({
  title,
  message,
  isOpen,
  onConfirm,
  onCancel,
}: ConfirmationPopInProps) {
  return (
    <Popin
      title={title}
      isOpen={isOpen}
      onClose={() => {
        onCancel.action();
      }}
    >
      <div className={scss.popin_body}>
        <span>{message}</span>
      </div>
      <ActionsContainer className={scss.actions}>
        <ActionButton
          style={ActionStyle.DANGER}
          variant="outlined"
          onClick={onCancel.action}
        >
          {onCancel.title}
        </ActionButton>
        <ActionButton
          style={ActionStyle.PRIMARY}
          onClick={onConfirm.action}
        >
          {onConfirm.title}
        </ActionButton>
      </ActionsContainer>
    </Popin>
  );
}
