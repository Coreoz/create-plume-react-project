import { usersRouteDefinitions } from '@lib/plume-admin-users/router/UsersRouter';
import { createRouter, defineRoute, param } from 'type-route';

export const REDIRECT_PARAM: string = 'redirect';

export const LOGIN: 'login' = 'login';
export const ROUTE_HOME: 'home' = 'home';

export const { RouteProvider, useRoute, routes, session } = createRouter(
  {
    scrollToTop: true,
  },
  {
    [LOGIN]: defineRoute({ [REDIRECT_PARAM]: param.query.optional.string }, () => '/login'),
    [ROUTE_HOME]: defineRoute('/'),
    ...usersRouteDefinitions,
  },
);

export type UseRoute = ReturnType<typeof useRoute>;

export type DeclaredRoutePaths = keyof typeof routes;
