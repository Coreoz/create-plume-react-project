import {
  createGroup, createRouter, defineRoute, param,
} from 'type-route';

export type UserRouteUpdate = {
  userId: string,
};

export const ROUTE_USERS: 'users' = 'users';
export const ROUTE_USERS_CREATE: 'usersCreate' = 'usersCreate';
export const ROUTE_USERS_UPDATE: 'usersUpdate' = 'usersUpdate';

const baseUserRoute: ReturnType<typeof defineRoute> = defineRoute('/users');

// eslint-disable-next-line @typescript-eslint/typedef
export const userRouteDefinitions = {
  [ROUTE_USERS]: baseUserRoute,
  [ROUTE_USERS_CREATE]: baseUserRoute.extend('/create'),
  [ROUTE_USERS_UPDATE]: baseUserRoute.extend(
    { userId: param.path.string },
    (params: UserRouteUpdate) => `/${params.userId}`,
  ),
};

export const { RouteProvider: UserRouterProvider, useRoute: useUsersRoute, routes: userRoutes } = createRouter(
  {
    scrollToTop: true,
  },
  userRouteDefinitions,
);

export const userGroup: ReturnType<typeof createGroup> = createGroup([
  userRoutes[ROUTE_USERS],
  userRoutes[ROUTE_USERS_CREATE],
  userRoutes[ROUTE_USERS_UPDATE],
],
);

export type UseUserRoute = ReturnType<typeof useUsersRoute>;
