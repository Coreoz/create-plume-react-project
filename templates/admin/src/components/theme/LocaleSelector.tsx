import { MenuItem } from '@mui/material';
import React from 'react';
import { Locale } from '../../lib/locale-resolver/LocaleResolver';
import DropdownMenu, { useOnClickSubscriber } from './DropdownMenu';

type LocaleSelectorProps = {
  currentLocale: Locale,
  availableLocales: Locale[],
  onLocaleSelected: (locale: Locale) => void,
};

export default function LocaleSelector(
  { currentLocale, availableLocales, onLocaleSelected } : LocaleSelectorProps,
) {
  const { subscribeOnClick, wrapOnClick } = useOnClickSubscriber();

  return (
    <DropdownMenu label={currentLocale.name} id="lang-menu" subscribeOnClick={subscribeOnClick}>
      {
        availableLocales.map((availableLocale) => (
          <MenuItem
            key={availableLocale.code}
            onClick={wrapOnClick(() => onLocaleSelected(availableLocale))}
          >
            {availableLocale.name}
          </MenuItem>
        ))
      }
    </DropdownMenu>
  );
}
