import { createRouter, defineRoute } from 'type-route';

export const ROUTE_HOME: 'home' = 'home';

export const { RouteProvider, useRoute, routes } = createRouter(
  {
    scrollToTop: true,
  },
  {
    [ROUTE_HOME]: defineRoute('/'),
  },
);

export type UseRoute = ReturnType<typeof useRoute>;

export type DeclaredRoutePaths = keyof typeof routes;
