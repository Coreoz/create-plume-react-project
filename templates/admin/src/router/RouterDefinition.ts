import { userRouteDefinitions } from '@lib/plume-admin-users/router/UserRouter';
import { createRouter, defineRoute } from 'type-route';

export const LOGIN: 'login' = 'login';
export const ROUTE_HOME: 'home' = 'home';

export const { RouteProvider, useRoute, routes } = createRouter(
  {
    scrollToTop: true,
  },
  {
    [LOGIN]: defineRoute('/login'),
    [ROUTE_HOME]: defineRoute('/'),
    ...userRouteDefinitions,
  },
);

export type UseRoute = ReturnType<typeof useRoute>;

export type DeclaredRoutePaths = keyof typeof routes;
