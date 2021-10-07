import React from 'react';
import { Locale } from '../../lib/locale-resolver/LocaleResolver';

type LocaleSelectorProps = {
  availableLocales: Locale[],
  onLocaleSelected: (locale: Locale) => void,
};

export default function LocaleSelector(
  { availableLocales, onLocaleSelected } : LocaleSelectorProps,
) {
  return (
    <div id="lang-menu">
      {
        availableLocales.map((availableLocale) => (
          <button
            type="button"
            key={availableLocale.code}
            onClick={() => onLocaleSelected(availableLocale)}
          >
            {availableLocale.name}
          </button>
        ))
      }
    </div>
  );
}
