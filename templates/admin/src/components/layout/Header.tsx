import React from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import { MenuItem } from '@mui/material';
import LocaleService from '../../i18n/locale/LocaleService';
import { Locale } from '../../lib/locale-resolver/LocaleResolver';
import { User } from '../../services/session/User';
import LocaleSelector from '../theme/LocaleSelector';
import SessionService from '../../services/session/SessionService';
import MessageService from '../../i18n/messages/MessageService';
import DropdownMenu from '../theme/DropdownMenu';

type HeaderProps = {
  currentLocale: Locale;
  currentUser?: User;
};

export default function Header({ currentLocale, currentUser }: HeaderProps) {
  const localeService = getGlobalInstance(LocaleService);
  const sessionService = getGlobalInstance(SessionService);
  const messages = getGlobalInstance(MessageService).t();

  const getInitialLettersOfUser = () => {
    const parts = currentUser?.fullName?.split(' ');
    return parts?.map((part) => part.charAt(0)).join('');
  };

  return (
    <header id="main-header">
      <h1 className="section_name">{messages['app.name']}</h1>
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
              <DropdownMenu label={getInitialLettersOfUser() || ''} id="user-menu">
                <div id="user-name">{currentUser.fullName}</div>
                <MenuItem
                  onClick={sessionService.disconnect}
                >
                  {messages['action.disconnect']}
                </MenuItem>
              </DropdownMenu>
            </div>
          )
        }
      </div>
    </header>
  );
}
