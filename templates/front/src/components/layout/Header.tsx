import React from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import { useObservable } from 'micro-observables';
import LocaleSelector from '../theme/LocaleSelector';
import LocaleService from '../../i18n/locale/LocaleService';

export default function Header() {
  const localeService = getGlobalInstance(LocaleService);
  const currentLocale = useObservable(localeService.getCurrentLocale());

  return (
    <header id="main-header">
      <LocaleSelector
        availableLocales={localeService.getAvailableLocales()}
        onLocaleSelected={(newLocale) => localeService.setCurrentLocale(newLocale)}
        currentLocale={currentLocale}
      />
    </header>
  );
}
