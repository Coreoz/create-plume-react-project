import { Logger } from 'simple-logging-system';
import { HttpError } from 'simple-http-rest-client';
import MessageService from './MessageService';
import PlumeMessageResolver from '../../lib/plume-messages/MessageResolver';

const logger = new Logger('MessageResolver');

/**
 * Implémentation de {@link PlumeMessageResolver}
 * pour permettre d'exposer l'API de gestion des libellés/messages dans les écrans d'administration Plume
 */
export default class MessageResolver implements PlumeMessageResolver {
  constructor(private readonly messages: MessageService) {
  }

  private messageResolver = (messageKey: string, ...messageArgs: string[]): string => {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const translation = (this.messages.t() as any)[messageKey];
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
