import classNames from '@lib/class-names/ClassNames';
import {
  Icon, ListItemButton, ListItemIcon, ListItemText,
} from '@mui/material';
import { createGroup } from 'type-route';
import {
  DeclaredRoutePaths, routes, UseRoute, useRoute,
} from '@components/router/RouterDefinition';
import { IconType } from '../theme/IconType';

import scss from './navigation.module.scss';

type LinkListItemProps<T extends DeclaredRoutePaths> = {
  icon: IconType,
  route: () => ReturnType<typeof routes[T]>,
  group?: ReturnType<typeof createGroup>,
  label: string,
  drawerOpen: boolean,
};

function LinkListItem<T extends DeclaredRoutePaths>(
  {
    icon,
    route,
    group,
    label,
    drawerOpen,
  }: LinkListItemProps<T>,
) {
  const activeRoute: UseRoute = useRoute();

  const routeIsActive: boolean = group?.has(activeRoute) ?? route.name === activeRoute.name;

  return (
    <ListItemButton
      component={
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (props: any) => <a {...props} {...route().link}>{label}</a>
      }
      to={activeRoute}
      className={classNames({ routeIsActive })}
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
