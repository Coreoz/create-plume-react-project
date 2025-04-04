import useMessages, { Messages } from '@i18n/hooks/messagesHook';
import LocaleService from '@i18n/locale/LocaleService';
import classNames from '@lib/class-names/ClassNames';
import { Locale } from '@lib/locale-resolver/LocaleResolver';
import { Divider, MenuItem } from '@mui/material';
import SessionService from '@services/session/SessionService';
import { UserWithExpiration } from '@services/session/User';
import { useObservable } from 'micro-observables';
import { getGlobalInstance } from 'plume-ts-di';
import DropdownMenu from '../../theme/DropdownMenu';
import LocaleSelector from '../../theme/LocaleSelector';

import scss from './header.module.scss';

function makeInitials(fullName?: string): string {
  if (!fullName) {
    return '';
  }
  const names: string[] = fullName.split(' ');
  let initials: string = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
}

function LocaleSelectorContainer() {
  const localeService: LocaleService = getGlobalInstance(LocaleService);
  const currentLocale: Locale | undefined = useObservable(localeService.getCurrentLocale());

  return (
    <LocaleSelector
      currentLocale={currentLocale}
      availableLocales={localeService.getAvailableLocales()}
      onLocaleSelected={(newLocale: Locale) => localeService.setCurrentLocale(newLocale)}
    />
  );
}

type Props = {
  id: string,
};

export default function Header({ id }: Props) {
  const sessionService: SessionService = getGlobalInstance(SessionService);
  const currentUser: UserWithExpiration | undefined = useObservable(sessionService.getCurrentUser());
  const { messages }: Messages = useMessages();

  return (
    <header id={id} className={scss.mainHeader}>
      <h1>{messages.app.name}</h1>
      <div className={scss.headerActions}>
        <div className={scss.headerAction}>
          <LocaleSelectorContainer />
        </div>
        {
          currentUser
          && (
            <div
              className={classNames(scss.headerAction, scss.headerActionCircle)}
            >
              <DropdownMenu
                label={makeInitials(currentUser.fullName)}
                id="user-menu"
              >
                <MenuItem disabled>
                  {currentUser.fullName}
                </MenuItem>
                <Divider />
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
