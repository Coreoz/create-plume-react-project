import { Logger } from 'simple-logging-system';
import { HttpError } from 'simple-http-rest-client';
import MessageService from './MessageService';
import PlumeMessageResolver from '../../lib/plume-messages/MessageResolver';

type KeyFunction = (...messageArgs: string[]) => string;

const logger = new Logger('MessageResolver');

/**
 * {@link PlumeMessageResolver} implementaton
 * It allows to expose the message handling API in the Plume administration theme components
 */
export default class MessageResolver implements PlumeMessageResolver {
  constructor(private readonly messages: MessageService) {
  }

  /**
   * This function reads a message key like 'tree.node.message_key'
   * Then splits it into a tab ['tree', 'node', 'message']
   * Then recursively going down the Translation tree until finding a word
   * @param messageKey: the message key like 'tree.node.message_key'
   * @param messageArgs: the potentials message arguments of the message
   */
  private messageResolver = (messageKey: string, ...messageArgs: string[]): string => {
    const translation = messageKey.split('.')
      .reduce(
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
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
