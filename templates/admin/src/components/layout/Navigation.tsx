import React from 'react';

import { Icon, List } from '@mui/material';
import { getGlobalInstance } from 'plume-ts-di';
import MessageService from '../../i18n/messages/MessageService';
import useToggle from '../../lib/react-hook-toggle/ReactHookToggle';
import Permission from '../../services/session/Permission';
import SessionService from '../../services/session/SessionService';
import { HOME, USERS } from '../Routes';
import LinkListItem from './LinkListItem';
import NestedListItem from './NestedListItem';
import plumeLogo from '../../../assets/icons/plume_logo.png';

export default function Navigation() {
  const sessionService = getGlobalInstance(SessionService);
  const messages = getGlobalInstance(MessageService).t();

  const [isDrawerOpened, toggleDrawerOpening] = useToggle(true);

  return (
    <nav className={`main-nav ${isDrawerOpened ? 'nav' : 'nav nav--reduced'}`}>
      <button type="button" className="toggle-nav">
        <Icon
          onClick={toggleDrawerOpening}
        >
          {isDrawerOpened ? 'arrow_back_ios' : 'arrow_forward_ios'}
        </Icon>
      </button>

      <div className="app-info">
        <img src={plumeLogo} className="logo" alt="logo" />
        <span>{messages.app.name}</span>
      </div>

      <List className="navigation">
        <LinkListItem
          icon="home"
          route={HOME}
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
                route={USERS}
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
