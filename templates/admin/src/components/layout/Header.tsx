import { MenuItem } from '@mui/material';
import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import LocaleService from '../../i18n/locale/LocaleService';
import MessageService from '../../i18n/messages/MessageService';
import { Locale } from '../../lib/locale-resolver/LocaleResolver';
import SessionService from '../../services/session/SessionService';
import { User } from '../../services/session/User';
import DropdownMenu from '../theme/DropdownMenu';
import LocaleSelector from '../theme/LocaleSelector';

type HeaderProps = {
  currentLocale: Locale;
  currentUser?: User;
};

function makeInitials(fullName?: string): string {
  if (!fullName) {
    return '';
  }
  const names = fullName.split(' ');
  let initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
}

export default function Header({ currentLocale, currentUser }: HeaderProps) {
  const localeService = getGlobalInstance(LocaleService);
  const sessionService = getGlobalInstance(SessionService);
  const messages = getGlobalInstance(MessageService).t();

  return (
    <header id="main-header">
      <h1 className="section_name">{messages.app.name}</h1>
      <div className="header_actions">
        <div className="header_action">
          <LocaleSelector
            currentLocale={currentLocale}
            availableLocales={localeService.getAvailableLocales()}
            onLocaleSelected={(newLocale) => localeService.setCurrentLocale(newLocale)}
          />
        </div>
        {
          currentUser
          && (
            <div className="header_action header_action--circle">
              <DropdownMenu label={makeInitials(currentUser.fullName)} id="user-menu">
                <div id="user-name">{currentUser.fullName}</div>
                <MenuItem
                  onClick={() => sessionService.disconnect()}
                >
                  {messages.action.disconnect}
                </MenuItem>
              </DropdownMenu>
            </div>
          )
        }
      </div>
    </header>
  );
}
