import Layout from '@components/layout/Layout';
import ErrorPage from '@components/pages/error/ErrorPage';
import Home from '@components/pages/home/Home';
import { ROUTE_HOME, UseRoute, useRoute } from './RouterDefinition';

export default function Router() {
  const route: UseRoute = useRoute();

  return (
    <Layout>
      {route.name === ROUTE_HOME && <Home />}
      {route.name === false && <ErrorPage /> }
    </Layout>
  );
}
