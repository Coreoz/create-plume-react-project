import {
  ConfirmationPopInProps,
} from '@lib/plume-admin-theme/popin/PopinProps';
import ActionStyle from '@lib/plume-admin-theme/action/ActionStyle';
import { ActionButton, ActionsContainer } from '../action/Actions';
import Popin from './Popin';

import scss from './popin.module.scss';

/**
 * Creates a pop in with user information displaying 2 configurable actions : confirmation or cancellation
 * Can be easily used with {@link useConfirmationPopIn} hook
 *
 * @param title the title of teh pop in
 * @param message the content of the pop in
 * @param isOpen true if the pop in must be displayed
 * @param onConfirm configuration action when confirming
 * @param onCancel configuration action when cancelling
 */
export default function ConfirmationPopIn({
  title,
  message,
  isOpen,
  onConfirm,
  onCancel,
}: Readonly<ConfirmationPopInProps>) {
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
