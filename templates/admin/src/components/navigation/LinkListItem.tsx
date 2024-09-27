import {
  Icon,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Link, PathMatch, useMatch } from 'react-router-dom';
import { IconType } from '../theme/IconType';

import scss from './navigation.module.scss';

type LinkListItemProps = {
  icon: IconType,
  route: string,
  label: string,
  drawerOpen: boolean,
};

function LinkListItem(
  {
    icon,
    route,
    label,
    drawerOpen,
  }: LinkListItemProps,
) {
  const routeMatch: PathMatch<string> | null = useMatch({ path: route });

  return (
    <ListItemButton
      component={Link}
      to={route}
      className={routeMatch ? scss.active : ''}
    >
      <ListItemIcon className={scss.icon}>
        <Icon fontSize="large">{icon}</Icon>
      </ListItemIcon>
      {
        drawerOpen
        && (
          <ListItemText className={scss.text} primary={label} />
        )
      }
    </ListItemButton>
  );
}

export default (LinkListItem);
