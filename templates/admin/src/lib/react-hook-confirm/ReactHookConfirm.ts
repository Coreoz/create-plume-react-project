import useMessages from '@i18n/hooks/messagesHook';
import {
  ConfirmationPopInProps,
} from '@lib/plume-admin-theme/popin/PopinProps';
import { useCallback, useState } from 'react';

export type ConfirmationPopInOptions = {
  title: string,
  message: string,
  onConfirm: {
    title?: string,
    action: () => void,
  },
  onCancel?: {
    title?: string,
    action?: () => void,
  },
};

export type ConfirmationPopInType = {
  showConfirmationPopIn: (options: ConfirmationPopInOptions) => void,
  hideConfirmationPopIn: () => void,
  popInProps: ConfirmationPopInProps,
};

const useConfirmationPopIn = (): ConfirmationPopInType => {
  const {
    messages,
  } = useMessages();
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<ConfirmationPopInOptions>();

  const showConfirmationPopIn: (newOptions: ConfirmationPopInOptions) => void = useCallback(
    (newOptions: ConfirmationPopInOptions) => {
      setOptions(newOptions);
      setVisible(true);
    },
    [],
  );

  const hideConfirmationPopIn: () => void = useCallback(() => {
    setVisible(false);
  }, []);

  const handleConfirm: () => void = useCallback(() => {
    options?.onConfirm.action();
    hideConfirmationPopIn();
  }, [options, hideConfirmationPopIn]);

  const handleCancel: () => void = useCallback(() => {
    options?.onCancel?.action?.();
    hideConfirmationPopIn();
  }, [options, hideConfirmationPopIn]);

  return {
    showConfirmationPopIn,
    hideConfirmationPopIn,
    popInProps: {
      isOpen: visible,
      title: options?.title ?? '',
      message: options?.message ?? '',
      onConfirm: {
        action: handleConfirm,
        title: options?.onConfirm.title ?? '',
      },
      onCancel: {
        action: handleCancel,
        title: options?.onCancel?.title ?? messages.action.cancel,
      },
    },
  };
};

export default useConfirmationPopIn;
