import React from 'react';
import { Link } from 'react-router-dom';
import { getGlobalInstance } from 'plume-ts-di';
import { Collapse, Icon, List, ListItem, ListItemIcon, ListItemText, } from '@mui/material';
import SessionService from '../../services/session/SessionService';
import Permission from '../../services/session/Permission';
import { HOME, USERS } from '../Routes';
import { WithChildren } from '../../lib/ts-react-children-type/WithChildren';
import { IconType } from '../theme/IconType';
import MessageService from '../../i18n/messages/MessageService';
import useToggle from '../../lib/react-hook-toggle/ReactHookConfirm';

type LinkListItemProps = {
  icon: IconType,
  route: string,
  label: string,
  drawerOpen: boolean,
  selected: boolean,
};

const LinkListItem = (
  {
    icon, route, label, drawerOpen, selected
  }: LinkListItemProps
) => (
  <ListItem
    button
    component={Link}
    to={route}
    className={selected ? 'active list-item' : 'list-item'}
  >
    <ListItemIcon>
      <Icon fontSize="large">{icon}</Icon>
    </ListItemIcon>
    {
      drawerOpen
      && (
        <ListItemText primary={label} />
      )
    }
  </ListItem>
);

type NestedItemProps = WithChildren<{
  icon?: IconType;
  opened?: boolean;
  label: string;
  drawerOpen: boolean;
}>;

const NestedItem = (
  {
    icon, label, opened, children, drawerOpen,
  }: NestedItemProps
) => {
  const [isItemOpened, toggleItemOpening] = useToggle(opened ?? true);

  return (
    <>
      <ListItem button onClick={toggleItemOpening}>
        {icon && (
          <ListItemIcon>
            <Icon fontSize="large">{icon}</Icon>
          </ListItemIcon>
        )}
        {drawerOpen && <ListItemText primary={label} />}
        {isItemOpened ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
      </ListItem>
      <Collapse in={isItemOpened} timeout="auto" unmountOnExit>
        <List component="div" disablePadding className="nested-items">
          {children}
        </List>
      </Collapse>
    </>
  );
};

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
        <img src="/assets/icons/plume_logo.png" className="logo" alt="logo" />
        <span>{messages['app.name']}</span>
      </div>

      <List className="navigation">
        <LinkListItem
          icon="home"
          route={HOME}
          label={messages['nav.home']}
          drawerOpen={isDrawerOpened}
          selected={true}
        />
        {
          sessionService.hasPermission(Permission.MANAGE_USERS)
          && (
            <NestedItem icon="manage_accounts" label={messages['nav.users']} drawerOpen={isDrawerOpened}>
              <LinkListItem
                icon="account_circle"
                route={USERS}
                label={messages['nav.user-list']}
                drawerOpen={isDrawerOpened}
                selected={true}
              />
            </NestedItem>
          )
        }
      </List>
    </nav>
  );
}
