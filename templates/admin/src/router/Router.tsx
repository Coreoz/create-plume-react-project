import Login from '@components/features/login/Login';
import Layout from '@components/layout/Layout';

import UserGroupRoot from '@lib/plume-admin-users/pages/UsersRoot';
import { userGroup } from '@lib/plume-admin-users/router/UserRouter';
import { Home } from '@mui/icons-material';
import Permission from '@services/session/Permission';
import SessionService from '@services/session/SessionService';
import { useObservable } from 'micro-observables';
import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import { Logger } from 'simple-logging-system';
import { LOGIN, ROUTE_HOME, routes, UseRoute, useRoute } from './RouterDefinition';

const logger: Logger = new Logger('App');

export default function Router() {
  const sessionService: SessionService = getGlobalInstance(SessionService);

  const canManageUsers: boolean = useObservable(sessionService.hasPermission(Permission.MANAGE_USERS));
  const isAuthenticated: boolean = useObservable(sessionService.isAuthenticated());

  const route: UseRoute = useRoute();

  logger.info('Render App');

  if (!isAuthenticated) {
    routes[LOGIN]().push();

    return <Login />;
  }

  if (route.name === false) {
    routes[ROUTE_HOME]().push();

    return <></>
  }

  return (
    <Layout>
      {route.name === ROUTE_HOME && <Home />}
      {userGroup.has(route) && canManageUsers && <UserGroupRoot />}
    </Layout>
  )
}
