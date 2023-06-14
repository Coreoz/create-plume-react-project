import { useState } from 'react';
import { Logger } from 'simple-logging-system';

export type ReactHookConfirmProps = {
  /**
   * Will not ask a confirmation if this condition is false.
   * For example if a confirmation popup should be displayed only if some form values has changed,
   * then the `onlyIf` parameter should: be true when some values has changed, and false otherwise
   */
  onlyIf?: boolean,
};

/**
 * see {@link useConfirmation} for detailed usage
 */
export type ReactHookConfirm = {
  handleConfirmation: (onConfirmed?: () => void) => () => void,
  confirm: (onConfirmed: () => void) => () => void,
  reset: () => void,
  shouldAskConfirmation: boolean,
};

const logger: Logger = new Logger('ReactHookConfirm');

/**
 * Hook used to help build action confirmation popin mechanism.
 *
 * The use case is generally:
 * 1. Declare the action you want to be confirmed: `const action = () => deleteUser(...)`
 * 2. Use the hook: `const confirmAction = useConfirmation()`
 * 3. Declare in the action button the action to execute after a confirmation has been given:
 * `<button onClick={confirmAction.handleConfirmation(() => action)}>Delete user</button>`
 * 4. Declare in the JSX the popin that will be displayed if necessary:
 * `{confirmAction.shouldAskConfirmation && (<popin>...</popin>)}`
 * 5. In the confirmation popin, on the confirmation button, precise that a confirmation has been given
 * (so in case errors append during the action, the confirmation popin will not be displayed again):
 * `<button onClick={confirmAction.confirm(() => action)}>I am sure I want to delete the user!</button>`
 * 6. In the confirmation popin, on the reset button,
 * precise that the confirmation should still be asked if the user clicks again on the button:
 * `<button onClick={confirmAction.reset}>Cancel, oups I clicked on the wrong button!</button>`
 * @param onlyIf Will not ask a confirmation if this condition is false.
 * For example if a confirmation popup should be displayed only if some form values has changed,
 * then the `onlyIf` parameter should: be true when some values has changed, and false otherwise
 */
export default function useConfirmation({ onlyIf }: ReactHookConfirmProps = {}): ReactHookConfirm {
  const [confirmState, setConfirmState] = useState<boolean>(false);
  const [askConfirmationState, setAskConfirmationState] = useState<boolean>(false);

  return {
    handleConfirmation: (onConfirmed?: () => void) => () => {
      if (onlyIf !== false && (!confirmState || !onConfirmed)) {
        setAskConfirmationState(true);
      } else if (onConfirmed) {
        onConfirmed();
      } else {
        logger.warn(
          'Trying to call onConfirmed function, but no onConfirmed function was provided',
          { onlyIf },
        );
      }
    },
    confirm: (onConfirmed: () => void) => () => {
      setAskConfirmationState(false);
      setConfirmState(true);
      onConfirmed();
    },
    shouldAskConfirmation: askConfirmationState,
    reset: () => {
      setAskConfirmationState(false);
      setConfirmState(false);
    },
  };
}
