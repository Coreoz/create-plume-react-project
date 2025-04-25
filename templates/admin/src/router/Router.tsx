import Login from '@components/features/login/Login';
import Layout from '@components/layout/Layout';
import { useOnDependenciesChange } from '@lib/react-hooks-alias/ReactHooksAlias';
import SessionService from '@services/session/SessionService';
import { useObservable } from 'micro-observables';
import { getGlobalInstance } from 'plume-ts-di';
import { JSX } from 'react';
import { LOGIN, ROUTE_HOME, routes, UseRoute, useRoute } from './RouterDefinition';
import useActiveAuthenticatedRouteComponent from './useActiveAuthenticatedRouteComponent';

export default function Router() {
  const sessionService: SessionService = getGlobalInstance(SessionService);
  const isAuthenticated: boolean = useObservable(sessionService.isAuthenticated());

  const route: UseRoute = useRoute();
  const activeAuthenticatedRouteComponent: JSX.Element | null = useActiveAuthenticatedRouteComponent();

  useOnDependenciesChange(() => {
    if (!isAuthenticated && route.name !== LOGIN) {
      routes[LOGIN]().push();
    }
    if (isAuthenticated && !activeAuthenticatedRouteComponent) {
      routes[ROUTE_HOME]().push();
    }
  }, [route.name, isAuthenticated, activeAuthenticatedRouteComponent]);

  if (!isAuthenticated) {
    return <Login />;
  }

  if (activeAuthenticatedRouteComponent) {
    return (
      <Layout>
        {activeAuthenticatedRouteComponent}
      </Layout>
    );
  }

  return <></>;
}
