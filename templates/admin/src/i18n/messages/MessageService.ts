import { Observable } from 'micro-observables';
import { HttpError } from 'simple-http-rest-client';
import frMessages from '../translations/fr';
import { Locale } from '../../lib/locale-resolver/LocaleResolver';
import { Translations } from '../translations/Translations';
import LocaleService from '../locale/LocaleService';
import enMessages from '../translations/en';

export default class MessageService {
  private readonly messages: Observable<Translations>;

  private static translations: Map<Locale, Observable<Translations>> = new Map<Locale, Observable<Translations>>([
    [LocaleService.LOCALE_FR, frMessages],
    [LocaleService.LOCALE_EN, enMessages],
  ]);

  constructor(localeService: LocaleService) {
    this.messages = localeService.getCurrentLocale().select(MessageService.fetchMessages);
  }

  private static fetchMessages(locale: Locale) {
    return MessageService.translations.get(locale) ?? frMessages;
  }

  /**
   * Try to compute the corresponding error message and return the right translation.
   * If no message could be found, the error code is returned
   */
  static httpError(messages: Translations, error: HttpError): string {
    const translatedArguments: string[] = (error.statusArguments ?? []).map((argument: string) => {
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      const translation: string | Function = (messages as any)[argument];
      if (translation && typeof translation === 'string') {
        return translation;
      }
      return argument;
    });
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const translatedMessage: string | Function = (messages['http-errors'] as any)[error.errorCode];
    if (translatedMessage) {
      if (typeof translatedMessage === 'function') {
        return translatedMessage(...translatedArguments);
      }
      return translatedMessage;
    }
    return error.errorCode;
  }

  /**
   * Return the messages observable for the current locale
   */
  getMessages() {
    return this.messages;
  }
}
