import React from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import { useObservable } from 'micro-observables';
import LocaleSelector from '../theme/LocaleSelector';
import LocaleService from '../../i18n/locale/LocaleService';
import { Locale } from '../../lib/locale-resolver/LocaleResolver';

function LocaleSelectorContainer() {
  const localeService: LocaleService = getGlobalInstance(LocaleService);
  const currentLocale: Locale = useObservable(localeService.getCurrentLocale());

  return <LocaleSelector
    currentLocale={currentLocale}
    availableLocales={localeService.getAvailableLocales()}
    onLocaleSelected={(newLocale: Locale) => localeService.setCurrentLocale(newLocale)}
  />;
}

export default function Header() {
  return (
    <header id="main-header">
      <LocaleSelectorContainer />
    </header>
  );
}
