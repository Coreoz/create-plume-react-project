import useMessages from '@i18n/hooks/messagesHook';
import NotificationEngine from '@lib/plume-notification/NotificationEngine';
import { getGlobalInstance } from 'plume-ts-di';
import { HttpError } from 'simple-http-rest-client';

export type PlumeNotification = {
  notifyHttpError: (error: HttpError) => void,
  notifyError: (text: string) => void,
  notifySuccess: (text: string) => void,
  notify: (text: string) => void,
  notifyWarning: (text: string) => void,
};

function useNotification(): PlumeNotification {
  const notificationEngine: NotificationEngine = getGlobalInstance(NotificationEngine);
  const { httpError } = useMessages();

  const notifyHttpError = (error: HttpError): void => {
    notificationEngine.addDanger(httpError(error));
  };

  const notifyError = (text: string): void => {
    notificationEngine.addDanger(text);
  };

  const notifySuccess = (text: string): void => {
    notificationEngine.addSuccess(text);
  };

  const notify = (text: string): void => {
    notificationEngine.addInfo(text);
  };

  const notifyWarning = (text: string): void => {
    notificationEngine.addWarning(text);
  };

  return {
    notifyHttpError,
    notifyError,
    notifySuccess,
    notify,
    notifyWarning,
  };
}

export default useNotification;
