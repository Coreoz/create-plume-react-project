import { Injector } from 'plume-ts-di';
import { LocaleResolver } from '@lib/locale-resolver/LocaleResolver';
import LocaleResolverFactory from '@i18n/locale/LocaleResolverFactory';
import LocaleService from '@i18n/locale/LocaleService';
import MessageService from '@i18n/messages/MessageService';

export default function installI18nModule(injector: Injector) {
  injector.registerSingleton(MessageService);
  injector.registerSingleton(LocaleService);
  injector.registerSingletonProvider(LocaleResolverFactory, LocaleResolver);
}
