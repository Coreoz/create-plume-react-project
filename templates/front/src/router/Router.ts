import {
  createRouter, defineRoute, param, RouterOpts,
} from 'type-route';

export const ROUTE_HOME: 'home' = 'home';
export const ROUTE_HELLO: 'homeHello' = 'homeHello';

const routerOptions: RouterOpts = {
  scrollToTop: false,
};

type RouteHelloPathPathParam = { name: string };

export const { RouteProvider, useRoute, routes } = createRouter(
  routerOptions,
  {
    [ROUTE_HOME]: defineRoute('/'),
    [ROUTE_HELLO]: defineRoute(
      { name: param.path.string },
      ({ name }: RouteHelloPathPathParam) => `/hello/${name}`,
    ),
  },
);

export type UseRoute = ReturnType<typeof useRoute>;
