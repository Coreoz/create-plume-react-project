import { Injector } from 'plume-ts-di';
import { LocaleResolver } from '../lib/locale-resolver/LocaleResolver';
import PlumeMessageResolverService from '../lib/plume-messages/MessageResolverService';
import LocaleResolverFactory from './locale/LocaleResolverFactory';
import LocaleService from './locale/LocaleService';
import MessageService from './messages/MessageService';
import MessageResolverService from './messages/plume/MessageResolverService';

export default function installI18nModule(injector: Injector) {
  injector.registerSingleton(MessageService);
  injector.registerSingleton(LocaleService);
  injector.registerSingleton(MessageResolverService, PlumeMessageResolverService);
  injector.registerSingletonProvider(LocaleResolverFactory, LocaleResolver);
}
