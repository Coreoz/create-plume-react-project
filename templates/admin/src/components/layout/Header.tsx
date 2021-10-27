import React from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import { MenuItem } from '@mui/material';
import { Locale } from '../../lib/locale-resolver/LocaleResolver';
import { User } from '../../services/session/User';
import LocaleSelector from '../theme/LocaleSelector';
import SessionService from '../../services/session/SessionService';
import DropdownMenu from '../theme/DropdownMenu';
import LocaleService from '../../i18n/locale/LocaleService';
import MessageService from '../../i18n/messages/MessageService';

type HeaderProps = {
  currentLocale: Locale;
  currentUser?: User;
};

export default function Header({ currentLocale, currentUser } : HeaderProps) {
  const localeService = getGlobalInstance(LocaleService);
  const sessionService = getGlobalInstance(SessionService);
  const messages = getGlobalInstance(MessageService).t();

  return (
    <header id="main-header">
      <LocaleSelector
        currentLocale={currentLocale}
        availableLocales={localeService.getAvailableLocales()}
        onLocaleSelected={(newLocale) => localeService.setCurrentLocale(newLocale)}
      />
      {
          currentUser
          && (
            <DropdownMenu label={currentUser.fullName} id="user-menu">
              <MenuItem
                onClick={() => sessionService.disconnect()}
              >
                {messages['action.disconnect']}
              </MenuItem>
            </DropdownMenu>
          )
        }
    </header>
  );
}
