import { WithChildren } from '../../ts-react-children-type/WithChildren';
import { ReactHookConfirm } from '../../react-hook-confirm/ReactHookConfirm';

export type PopinProps = WithChildren<{
  zIndex?: number,
  height?: string;
  width?: string;
}>;

export type PopinCloseWithoutSavingProps = {
  confirmCloseWithoutSaving: ReactHookConfirm,
  closeWithoutSavingAction: () => void,
};
