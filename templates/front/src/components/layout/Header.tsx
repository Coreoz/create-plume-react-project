import React from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import { Locale } from '../../lib/locale-resolver/LocaleResolver';
import LocaleSelector from '../theme/LocaleSelector';
import LocaleService from '../../i18n/locale/LocaleService';

type HeaderProps = {
  currentLocale: Locale;
};

export default function Header({ currentLocale } : HeaderProps) {
  const localeService = getGlobalInstance(LocaleService);

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
