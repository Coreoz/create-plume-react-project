import { Logger } from 'simple-logging-system';
import { HttpError } from 'simple-http-rest-client';
import PlumeMessageResolver from '../../../lib/plume-messages/MessageResolver';
import { Translations } from '../../translations/Translations';
import MessageService from '../MessageService';

type KeyFunction = (...messageArgs: string[]) => string;

const logger: Logger = new Logger('MessageResolver');

/**
 * {@link PlumeMessageResolver} implementation
 * It allows to expose the message handling API in the Plume administration theme components
 */
export default class MessageResolver implements PlumeMessageResolver {
  constructor(private readonly messages: Translations) {
  }

  /**
   * This function reads a message key like 'tree.node.message_key'
   * Then splits it into a tab ['tree', 'node', 'message']
   * Then recursively going down the Translation tree until finding a word
   *
   * @param messageKey: the message key like 'tree.node.message_key'
   * @param messageArgs: the potentials arguments of the message
   */
  private messageResolver = (messageKey: string, ...messageArgs: string[]): string => {
    const translation: Translations = messageKey.split('.')
      // Enables to find the message value in a object (e.g `{a: {b: {c: value}}}` with a string key (e.g `a.b.c`)
      .reduce(
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        (p: Translations, c: string) => (p as any)?.[c],
        // returns all the translations
        this.messages,
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

  httpError = (error: HttpError) => MessageService.httpError(this.messages, error);

  t: (messageKey: string, ...messageArgs: string[]) => string = this.messageResolver;
}
