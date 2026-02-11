import Home from '@components/features/Home';
import {
  useRequireAccess,
} from '@lib/plume-admin-redirect/RequiredAccessHooks';
import { usersGroup } from '@lib/plume-admin-users/router/UsersRouter';
import UsersModule from '@lib/plume-admin-users/UsersModule';
import Permission from '@services/session/Permission';
import SessionService from '@services/session/SessionService';
import { useObservable } from 'micro-observables';
import { getGlobalInstance } from 'plume-ts-di';
import { JSX, useMemo } from 'react';
import {
  LOGIN,
  REDIRECT_PARAM,
  ROUTE_HOME,
  routes,
  session,
  useRoute,
  UseRoute,
} from './RouterDefinition';

export default function useAuthenticatedRouter(): JSX.Element | null {
  const sessionService: SessionService = getGlobalInstance(SessionService);
  const canManageUsers: boolean = useObservable(sessionService.hasPermission(Permission.MANAGE_USERS));
  const isAuthenticated: boolean = useObservable(sessionService.isAuthenticated());

  const route: UseRoute = useRoute();

  const { allowed } = useRequireAccess({
    hasAccess: isAuthenticated,
    currentUrl: location.pathname + location.search,
    fallbackUrl: LOGIN,
    paramName: REDIRECT_PARAM,
    useQueryParam: route.name !== LOGIN, // only append redirect param if not already on the login page
    shouldRedirect: route.name !== LOGIN,
    navigate: (url: string) => session.push(url),
  });

  return useMemo(() => {
    if (!allowed) {
      return null;
    }

    if (route.name === ROUTE_HOME) {
      return <Home />;
    }

    if (usersGroup.has(route) && canManageUsers) {
      return <UsersModule />;
    }

    // default route if no other route matches
    routes[ROUTE_HOME]().push();
    return <></>;
  }, [allowed, route, canManageUsers]);
}
