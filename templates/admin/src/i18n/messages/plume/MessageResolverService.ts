import { Observable } from 'micro-observables';
import PlumeMessageResolver from '../../../lib/plume-messages/MessageResolver';
import MessageService from '../MessageService';
import MessageResolver from './MessageResolver';
import PlumeMessageResolverService from '../../../lib/plume-messages/MessageResolverService';
import { Translations } from '../../translations/Translations';

/**
 * {@link PlumeMessageResolver} implementation
 * It allows to expose the message handling API in the Plume administration theme components
 */
export default class MessageResolverService implements PlumeMessageResolverService {
  private messageResolver: Observable<MessageResolver>;

  constructor(private readonly messageService: MessageService) {
    this.messageResolver = this
      .messageService
      .getMessages()
      .select((messages: Translations) => new MessageResolver(messages));
  }

  getMessages(): Observable<PlumeMessageResolver> {
    return this.messageResolver;
  }
}
