import {
  Icon, ListItemButton, ListItemIcon, ListItemText,
} from '@mui/material';
import { createGroup } from 'type-route';
import { routes, UseRoute, useRoute } from '../../router/Router';
import { IconType } from '../theme/IconType';

import scss from './navigation.module.scss';

type LinkListItemProps<T extends keyof typeof routes> = {
  icon: IconType,
  route: () => ReturnType<typeof routes[T]>,
  group?: ReturnType<typeof createGroup>,
  label: string,
  drawerOpen: boolean,
};

function LinkListItem<T extends keyof typeof routes>(
  {
    icon,
    route,
    group,
    label,
    drawerOpen,
  }: LinkListItemProps<T>,
) {
  const activeRoute: UseRoute = useRoute();

  const routeActive: boolean = group === undefined
    ? route.name === activeRoute.name
    : group.has(activeRoute);

  return (
    <ListItemButton
      component={
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (props: any) => <a {...props} {...route().link}>{label}</a>
      }
      to={activeRoute}
      className={routeActive ? scss.active : ''}
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
