import { Logger } from 'simple-logging-system';
import { HttpError } from '../../lib/plume-http/client/HttpResponse';
import PlumeMessageResolver from '../../lib/plume-messages/MessageResolver';
import MessageService from './MessageService';

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
        (p, c) => p?.[c],
        this.messages.t(),
      );
    if (translation === undefined) {
      logger.info(`No translation for '${messageKey}'`);
      return messageKey;
    }
    if (typeof translation === 'function') {
      return translation(...messageArgs);
    }
    return translation;
  };

  // implementing PlumeMessageResolver

  httpError = (error: HttpError) => this.messages.httpError(error);

  t = this.messageResolver;
}
