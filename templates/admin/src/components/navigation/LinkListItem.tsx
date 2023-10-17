import React from 'react';
import { Link, PathMatch, useMatch } from 'react-router-dom';
import {
  Icon,
  ListItemButton,
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
  const routeMatch: PathMatch<string> | null = useMatch({ path: route });
  return (
    <ListItemButton
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
    </ListItemButton>
  );
}

export default (LinkListItem);
