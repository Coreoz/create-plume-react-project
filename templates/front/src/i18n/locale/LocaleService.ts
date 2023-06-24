import { observable, WritableObservable } from 'micro-observables';
import { Locale, LocaleResolver } from '@lib/locale-resolver/LocaleResolver';

/**
 * Récupère la langue par défaut, et permet de changer la langue courante
 * en enregistrant le choix dans le locale storage
 */
export default class LocaleService {
  static readonly LOCALE_FR = { code: 'fr', name: 'Français' } as const;

  static readonly LOCALE_EN = { code: 'en', name: 'English' } as const;

  private readonly currentLocale: WritableObservable<Locale>;

  constructor(private readonly localeResolver: LocaleResolver) {
    this.currentLocale = observable(localeResolver.resolve());
    LocaleService.setHtmlLang(this.currentLocale.get());
  }

  getCurrentLocale() {
    return this.currentLocale.readOnly();
  }

  setCurrentLocale(newLocale: Locale) {
    this.currentLocale.set(newLocale);
    if (this.localeResolver.hasLocaleStorage()) {
      this.localeResolver.setPreferredLocale(newLocale);
    }
    LocaleService.setHtmlLang(newLocale);
  }

  getAvailableLocales() {
    return this.localeResolver.getAvailableLocales();
  }

  private static setHtmlLang(local: Locale) {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('lang', local.code);
    }
  }
}
