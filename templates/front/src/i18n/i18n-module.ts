import { Injector } from 'plume-ts-di';
import PlumeMessageResolver from '../lib/plume-messages/MessageResolver';
import MessageService from './messages/MessageService';
import MessageResolver from './messages/MessageResolver';
import { LocaleResolver } from '../lib/locale-resolver/LocaleResolver';
import LocaleService from './locale/LocaleService';
import LocaleResolverFactory from './locale/LocaleResolverFactory';

export default function installI18nModule(injector: Injector) {
  injector.registerSingleton(MessageService);
  injector.registerSingleton(MessageResolver, PlumeMessageResolver);
  injector.registerSingleton(LocaleService);
  injector.registerSingletonProvider(LocaleResolverFactory, LocaleResolver);
}
