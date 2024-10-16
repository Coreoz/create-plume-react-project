import { createRouter, defineRoute, RouterOpts, } from 'type-route';

export const ROUTE_HOME: 'home' = 'home';

const routerOptions: RouterOpts = {
  scrollToTop: false,
};

export const { RouteProvider, useRoute, routes } = createRouter(
  routerOptions,
  {
    [ROUTE_HOME]: defineRoute('/'),
  },
);

export type UseRoute = ReturnType<typeof useRoute>;
