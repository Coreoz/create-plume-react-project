import { ReactHookConfirm } from '../../react-hook-confirm/ReactHookConfirm';

export type PopinProps = {
  zIndex?: number,
  height?: string,
  width?: string,
  children?: React.ReactNode,
};

export type PopinCloseWithoutSavingProps = {
  confirmCloseWithoutSaving: ReactHookConfirm,
  closeWithoutSavingAction: () => void,
};
