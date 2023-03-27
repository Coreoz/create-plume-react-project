import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/fr';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import LocaleService from '../locale/LocaleService';

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
