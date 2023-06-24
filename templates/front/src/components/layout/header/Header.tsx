import LocaleSelector from '@components/theme/LocaleSelector';
import LocaleService from '@i18n/locale/LocaleService';
import React from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import { useObservable } from 'micro-observables';
import scss from './header.module.scss';

function LocaleSelectorContainer() {
  const localeService = getGlobalInstance(LocaleService);
  const currentLocale = useObservable(localeService.getCurrentLocale());

  return (
    <LocaleSelector
      currentLocale={currentLocale}
      availableLocales={localeService.getAvailableLocales()}
      onLocaleSelected={(newLocale) => localeService.setCurrentLocale(newLocale)}
    />
  );
}

export default function Header() {
  return (
    <header id={scss.mainHeader}>
      <LocaleSelectorContainer />
    </header>
  );
}
