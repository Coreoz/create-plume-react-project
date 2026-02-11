import Login from '@components/features/login/Login';
import Layout from '@components/layout/Layout';
import { JSX } from 'react';
import { LOGIN, UseRoute, useRoute } from './RouterDefinition';
import useAuthenticatedRouter from './useAuthenticatedRouter';

export default function Router() {
  const route: UseRoute = useRoute();
  const activeComponent: JSX.Element | null = useAuthenticatedRouter();

  if (route.name === LOGIN) {
    return <Login />;
  }

  return (
    <Layout>
      {activeComponent}
    </Layout>
  );
}
