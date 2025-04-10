import { ROUTE_USERS, usersGroup } from '@lib/plume-admin-users/router/UsersRouter';
import { Icon, List } from '@mui/material';
import { getGlobalInstance } from 'plume-ts-di';
import plumeLogo from '../../../assets/icons/plume_logo.png';
import useMessages, { Messages } from '@i18n/hooks/messagesHook';
import classNames from '@lib/class-names/ClassNames';
import useToggle from '@lib/react-hook-toggle/ReactHookToggle';
import { routes, ROUTE_HOME } from '../../router/RouterDefinition';
import Permission from '@services/session/Permission';
import SessionService from '@services/session/SessionService';
import LinkListItem from './LinkListItem';

import scss from './navigation.module.scss';
import NestedListItem from './NestedListItem';

export default function Navigation() {
  const sessionService: SessionService = getGlobalInstance(SessionService);
  const { messages }: Messages = useMessages();

  const [isDrawerOpened, toggleDrawerOpening] = useToggle(true);

  return (
    <nav className={classNames(scss.mainNav, isDrawerOpened ? undefined : scss.mainNavClosed)}>
      <button type="button" className={scss.toggleNav} onClick={toggleDrawerOpening}>
        <Icon>
          {isDrawerOpened ? 'arrow_back_ios' : 'arrow_forward_ios'}
        </Icon>
      </button>

      <div className={scss.appInfo}>
        <img src={plumeLogo} className="logo" alt="logo" />
        <span className={scss.appName}>{messages.app.name}</span>
      </div>
      <List className={scss.navigation}>
        <LinkListItem
          icon="home"
          route={routes[ROUTE_HOME]}
          label={messages.nav.home}
          drawerOpen={isDrawerOpened}
        />
        {
          sessionService.hasPermission(Permission.MANAGE_USERS)
          && (
            <NestedListItem
              icon="manage_accounts"
              label={messages.nav.users}
              drawerOpen={isDrawerOpened}
            >
              <LinkListItem
                icon="account_circle"
                route={routes[ROUTE_USERS]}
                group={usersGroup}
                label={messages.nav.user_list}
                drawerOpen={isDrawerOpened}
              />
            </NestedListItem>
          )
        }
      </List>
    </nav>
  );
}
