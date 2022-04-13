import { HttpError } from 'simple-http-rest-client';
import frMessages from '../translations/fr';
import { Locale } from '../../lib/locale-resolver/LocaleResolver';
import { Translations } from '../translations/Translations';
import LocaleService from '../locale/LocaleService';
import enMessages from '../translations/en';

export default class MessageService {
  private messages = frMessages;

  private static translations = new Map<Locale, Translations>([
    [LocaleService.LOCALE_FR, frMessages],
    [LocaleService.LOCALE_EN, enMessages],
  ]);

  constructor(localeService: LocaleService) {
    this.updateMessagesWithLocale(localeService.getCurrentLocale().get());
    localeService
      .getCurrentLocale()
      .subscribe((locale) => this.updateMessagesWithLocale(locale));
  }

  private updateMessagesWithLocale(locale: Locale) {
    this.messages = MessageService.translations.get(locale) ?? frMessages;
  }

  /**
   * Try to compute the corresponding error message and return the right translation.
   * If no message could be found, the error code is returned
   */
  httpError(error: HttpError): string {
    const translatedArguments = (error.statusArguments ?? []).map((argument) => {
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      const translation = (this.t() as any)[argument];
      if (translation && typeof translation === 'string') {
        return translation;
      }
      return argument;
    });
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const translatedMessage = (this.t()['http-errors'] as any)[error.errorCode];
    if (translatedMessage) {
      if (typeof translatedMessage === 'function') {
        return translatedMessage(...translatedArguments);
      }
      return translatedMessage;
    }
    return error.errorCode;
  }

  /**
   * Provide access to the translated messages.
   * This is the only place in the application where we authorize direct static access, indeed:
   * 1/ Translations are used all over the application,
   * it would be a pain to pass everywhere the MessageService
   * 2/ Translations have a very little impact on testability
   * and it can anyway be configured statically
   */
  t() {
    return this.messages;
  }
}
