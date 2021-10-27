import React from 'react';
import { Link } from 'react-router-dom';
import { getGlobalInstance } from 'plume-ts-di';
import {
  Collapse,
  Icon, List, ListItem, ListItemIcon, ListItemText,
} from '@mui/material';
import SessionService from '../../services/session/SessionService';
import Permission from '../../services/session/Permission';
import { HOME, USERS } from '../Routes';
import { WithChildren } from '../../lib/ts-react-children-type/WithChildren';
import { IconType } from '../theme/IconType';
import MessageService from '../../i18n/messages/MessageService';

type LinkListItemProps = {
  icon: IconType;
  route: string;
  label: string;
};

const LinkListItem = ({ icon, route, label } : LinkListItemProps) => (
  <ListItem button component={Link} to={route}>
    <ListItemIcon>
      <Icon>{icon}</Icon>
    </ListItemIcon>
    <ListItemText primary={label} />
  </ListItem>
);

type NestedItemProps = WithChildren<{
  icon?: IconType;
  opened?: boolean;
  label: string;
}>;

const NestedItem = ({
  icon, label, opened, children,
} : NestedItemProps) => {
  const [open, setOpen] = React.useState(opened ?? true);

  const handleOpenClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem button onClick={handleOpenClick}>
        {icon && (
        <ListItemIcon>
          <Icon>{icon}</Icon>
        </ListItemIcon>
        )}
        <ListItemText primary={label} />
        {open ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
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

  // TODO il faudrait surement remplacer ça par https://material-ui.com/components/drawers/#persistent-drawer
  return (
    <nav id="main-nav">
      <div className="app-info">
        <strong>{messages['app.name']}</strong>
      </div>
      <hr />
      <List className="navigation">
        <LinkListItem icon="home" route={HOME} label={messages['nav.home']} />
        {sessionService.hasPermission(Permission.MANAGE_USERS) && (
        <NestedItem icon="manage_accounts" label={messages['nav.users']}>
          <LinkListItem icon="account_circle" route={USERS} label={messages['nav.user-list']} />
        </NestedItem>
        )}
      </List>
    </nav>
  );
}
