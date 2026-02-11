import Home from '@components/features/Home';
import UserGroupRoot from '@lib/plume-admin-users/pages/UsersRoot';
import { usersGroup } from '@lib/plume-admin-users/router/UsersRouter';
import Permission from '@services/session/Permission';
import SessionService from '@services/session/SessionService';
import { useObservable } from 'micro-observables';
import { getGlobalInstance } from 'plume-ts-di';
import { JSX, useMemo } from 'react';
import { ROUTE_HOME, useRoute, UseRoute } from './RouterDefinition';

export default function useActiveAuthenticatedRouteComponent(): JSX.Element | null {
  const sessionService: SessionService = getGlobalInstance(SessionService);
  const canManageUsers: boolean = useObservable(sessionService.hasPermission(Permission.MANAGE_USERS));

  const route: UseRoute = useRoute();

  return useMemo(
    () => {
      if (route.name === ROUTE_HOME) {
        return <Home />;
      }
      if (usersGroup.has(route) && canManageUsers) {
        return <UserGroupRoot />;
      }
      return null;
    },
    [route, canManageUsers],
  );
}
