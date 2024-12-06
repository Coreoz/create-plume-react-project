import Home from '@components/features/Home';
import Layout from '@components/layout/Layout';
import UserGroupRoot from '@lib/plume-admin-users/pages/UsersRoot';
import { userGroup } from '@lib/plume-admin-users/router/UserRouter';
import Permission from '@services/session/Permission';
import SessionService from '@services/session/SessionService';
import { useObservable } from 'micro-observables';
import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import { Logger } from 'simple-logging-system';
import NavigateHome from '../router/NavigateHome';
import {
  routes, LOGIN, ROUTE_HOME, useRoute, UseRoute,
} from '../router/Router';
import Login from './features/login/Login';

const logger: Logger = new Logger('App');

export default function App() {
  const sessionService: SessionService = getGlobalInstance(SessionService);

  const canManageUsers: boolean = useObservable(sessionService.hasPermission(Permission.MANAGE_USERS));
  const isAuthenticated: boolean = useObservable(sessionService.isAuthenticated());

  const route: UseRoute = useRoute();

  logger.info('Render App');

  if (!isAuthenticated) {
    setTimeout(() => {
      routes[LOGIN]().push();
    });

    return <Login />;
  }

  if (route.name === LOGIN) {
    setTimeout(() => {
      routes[ROUTE_HOME]().push();
    });
  }

  return (
    <Layout>
      {route.name === ROUTE_HOME && <Home />}
      {userGroup.has(route) && canManageUsers && <UserGroupRoot />}
      {route.name === false && <NavigateHome />}
    </Layout>
  );
}
