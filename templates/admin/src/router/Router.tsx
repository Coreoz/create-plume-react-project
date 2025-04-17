import Home from '@components/features/Home';
import Login from '@components/features/login/Login';
import Layout from '@components/layout/Layout';

import UserGroupRoot from '@lib/plume-admin-users/pages/UsersRoot';
import { usersGroup } from '@lib/plume-admin-users/router/UsersRouter';
import Permission from '@services/session/Permission';
import SessionService from '@services/session/SessionService';
import { useObservable } from 'micro-observables';
import { getGlobalInstance } from 'plume-ts-di';
import {
  LOGIN,
  ROUTE_HOME,
  routes,
  UseRoute,
  useRoute,
} from './RouterDefinition';
import { useOnDependenciesChange } from '@lib/react-hooks-alias/ReactHooksAlias';

export default function Router() {
  const sessionService: SessionService = getGlobalInstance(SessionService);

  const canManageUsers: boolean = useObservable(sessionService.hasPermission(Permission.MANAGE_USERS));
  const isAuthenticated: boolean = useObservable(sessionService.isAuthenticated());

  const route: UseRoute = useRoute();
  const redirectHomeCondition: boolean = route.name === false
    || (usersGroup.has(route) && !canManageUsers);

  useOnDependenciesChange(() => {
    if (isAuthenticated) {
      routes[LOGIN]().push();
    }
    if (redirectHomeCondition) {
      routes[ROUTE_HOME]().push();
    }
  }, [route, redirectHomeCondition]);

  if (!isAuthenticated) {
    return <Login />;
  }

  if (redirectHomeCondition) {
    return <></>;
  }

  return (
    <Layout>
      {route.name === ROUTE_HOME && <Home />}
      {usersGroup.has(route) && canManageUsers && <UserGroupRoot />}
    </Layout>
  );
}
