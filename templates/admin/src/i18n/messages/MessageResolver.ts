import { Logger } from 'simple-logging-system';
import { HttpError } from 'simple-http-rest-client';
import MessageService from './MessageService';
import PlumeMessageResolver from '../../lib/plume-messages/MessageResolver';

type KeyFunction = (...messageArgs: string[]) => string;

const logger = new Logger('MessageResolver');

/**
 * Implémentation de {@link PlumeMessageResolver}
 * pour permettre d'exposer l'API de gestion des libellés/messages dans les écrans d'administration Plume
 */
export default class MessageResolver implements PlumeMessageResolver {
  constructor(private readonly messages: MessageService) {
  }

  private messageResolver = (messageKey: string, ...messageArgs: string[]): string => {
    const translation = messageKey.split('.')
      .reduce(
        (p, c) => (p as any)?.[c],
        this.messages.t(),
      );
    if (translation === undefined) {
      logger.info(`No translation for '${messageKey}'`);
      return messageKey;
    }
    if (typeof translation === 'function') {
      return (translation as KeyFunction)(...messageArgs);
    }
    return translation as never;
  };

  // implementing PlumeMessageResolver

  httpError = (error: HttpError) => this.messages.httpError(error);

  t = this.messageResolver;
}
