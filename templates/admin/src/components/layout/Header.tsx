import { MenuItem } from '@mui/material';
import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import { useObservable } from 'micro-observables';
import LocaleService from '../../i18n/locale/LocaleService';
import UserService from '../../lib/plume-admin-users/service/UserService';
import SessionService from '../../services/session/SessionService';
import DropdownMenu from '../theme/DropdownMenu';
import LocaleSelector from '../theme/LocaleSelector';
import useMessages from '../../i18n/hooks/messagesHook';
import { UserWithExpiration } from '../../services/session/User';
import { Locale } from '../../lib/locale-resolver/LocaleResolver';

function LocaleSelectorContainer() {
  const localeService: LocaleService = getGlobalInstance(LocaleService);
  const currentLocale: Locale | undefined = useObservable(localeService.getCurrentLocale());

  return <LocaleSelector
    currentLocale={currentLocale}
    availableLocales={localeService.getAvailableLocales()}
    onLocaleSelected={(newLocale: Locale) => localeService.setCurrentLocale(newLocale)}
  />;
}

export default function Header() {
  const sessionService: SessionService = getGlobalInstance(SessionService);
  const currentUser: UserWithExpiration | undefined = useObservable(sessionService.getCurrentUser());
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
              <DropdownMenu label={UserService.userTrigramFromFullName(currentUser.fullName)} id="user-menu">
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
