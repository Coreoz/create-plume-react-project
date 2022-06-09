import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import {
  Icon,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { IconType } from '../theme/IconType';

type LinkListItemProps = {
  icon: IconType,
  route: string,
  label: string,
  drawerOpen: boolean,
};

function LinkListItem(
  {
    icon, route, label, drawerOpen,
  }: LinkListItemProps,
) {
  const routeMatch = useRouteMatch({ path: route, exact: false });
  return (
    <ListItem
      button
      component={Link}
      to={route}
      className={routeMatch ? 'active list-item' : 'list-item'}
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
}

export default (LinkListItem);
