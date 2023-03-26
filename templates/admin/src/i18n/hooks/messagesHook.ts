import { useObservable } from 'micro-observables';
import { getGlobalInstance } from 'plume-ts-di';
import { HttpError } from 'simple-http-rest-client';
import MessageService from '../messages/MessageService';
import { Translations } from '../translations/Translations';

export type Messages = {
  messages: Translations,
  httpError: (error: HttpError) => string,
};

export default function useMessages(): Messages {
  const messages = useObservable(getGlobalInstance(MessageService).getMessages());

  return {
    messages,
    httpError: (error: HttpError) => MessageService.httpError(messages, error),
  };
}
