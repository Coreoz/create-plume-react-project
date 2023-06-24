import 'dayjs/locale/fr';
import 'dayjs/locale/en';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import dayjs from 'dayjs';
import LocaleService from '@i18n/locale/LocaleService';

/**
 * Gère le chargement des traductions pour dayjs
 */
export default function initializeLocalizedDate(localeService: LocaleService) {
  dayjs.extend(localizedFormat);
  dayjs.locale(localeService.getCurrentLocale().get().code);
  localeService
    .getCurrentLocale()
    .subscribe((locale) => dayjs.locale(locale.code));
}
