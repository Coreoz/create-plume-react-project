import React from 'react';
import { Locale } from '../../lib/locale-resolver/LocaleResolver';

type LocaleSelectorProps = {
  availableLocales: Locale[],
  onLocaleSelected: (locale: Locale) => void,
  currentLocale: Locale,
};

export default function LocaleSelector(
  { availableLocales, onLocaleSelected, currentLocale } : LocaleSelectorProps,
) {
  return (
    <div id="lang-menu">
      {
        availableLocales.map((availableLocale: Locale) => (
          currentLocale === availableLocale
            ? (<span key={availableLocale.code}>{availableLocale.name}</span>)
            : (
              <button
                type="button"
                key={availableLocale.code}
                onClick={() => onLocaleSelected(availableLocale)}
              >
                {availableLocale.name}
              </button>
            )))
      }
    </div>
  );
}
