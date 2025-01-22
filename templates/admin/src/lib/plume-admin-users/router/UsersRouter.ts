import {
  createGroup, createRouter, defineRoute, param,
} from 'type-route';

export type UsersRouteUpdate = {
  userId: string,
};

export const ROUTE_USERS: 'users' = 'users';
export const ROUTE_USERS_CREATE: 'usersCreate' = 'usersCreate';
export const ROUTE_USERS_UPDATE: 'usersUpdate' = 'usersUpdate';

const baseUsersRoute: ReturnType<typeof defineRoute> = defineRoute('/users');

// eslint-disable-next-line @typescript-eslint/typedef
export const usersRouteDefinitions = {
  [ROUTE_USERS]: baseUsersRoute,
  [ROUTE_USERS_CREATE]: baseUsersRoute.extend('/create'),
  [ROUTE_USERS_UPDATE]: baseUsersRoute.extend(
    { userId: param.path.string },
    (params: UsersRouteUpdate) => `/${params.userId}`,
  ),
};

export const { RouteProvider: UsersRouterProvider, useRoute: useUsersRoute, routes: usersRoutes } = createRouter(
  {
    scrollToTop: true,
  },
  usersRouteDefinitions,
);

export const usersGroup: ReturnType<typeof createGroup> = createGroup([
  usersRoutes[ROUTE_USERS],
  usersRoutes[ROUTE_USERS_CREATE],
  usersRoutes[ROUTE_USERS_UPDATE],
],
);

export type UseUsersRoute = ReturnType<typeof useUsersRoute>;
