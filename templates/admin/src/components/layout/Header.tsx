import { MenuItem } from '@mui/material';
import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import { useObservable } from 'micro-observables';
import LocaleService from '../../i18n/locale/LocaleService';
import SessionService from '../../services/session/SessionService';
import DropdownMenu from '../theme/DropdownMenu';
import LocaleSelector from '../theme/LocaleSelector';
import useMessages from '../../i18n/hooks/messagesHook';

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

function LocaleSelectorContainer() {
  const localeService = getGlobalInstance(LocaleService);
  const currentLocale = useObservable(localeService.getCurrentLocale());

  return <LocaleSelector
    currentLocale={currentLocale}
    availableLocales={localeService.getAvailableLocales()}
    onLocaleSelected={(newLocale) => localeService.setCurrentLocale(newLocale)}
  />;
}

export default function Header() {
  const sessionService = getGlobalInstance(SessionService);
  const currentUser = useObservable(sessionService.getCurrentUser());
  const { messages } = useMessages();

  return (
    <header id="main-header">
      <h1 className="section_name">{messages.app.name}</h1>
      <div className="header_actions">
        <div className="header_action">
          <LocaleSelectorContainer />
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
