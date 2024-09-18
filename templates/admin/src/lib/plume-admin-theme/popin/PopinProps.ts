import { ActionButtonProps } from '@lib/plume-admin-theme/action/ActionProps';
import { ReactNode } from 'react';

export type PopinProps = {
  title: string,
  isOpen: boolean,
  onClose: () => void,
  children: ReactNode,
  className?: string,
};

type PopinAction = {
  title: string,
  action: () => void,
  buttonProps?: Omit<ActionButtonProps, 'onClick' | 'children'>,
};

export type ConfirmationPopInProps = {
  isOpen: boolean,
  title: string,
  message: string,
  onConfirm: PopinAction,
  onCancel: PopinAction,
};
