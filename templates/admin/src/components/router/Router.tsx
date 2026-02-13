import Login from '@components/features/login/Login';
import Layout from '@components/layout/Layout';
import AuthenticatedRouter from './AuthenticatedRouter.tsx';
import { LOGIN, UseRoute, useRoute } from './RouterDefinition';

export default function Router() {
  const route: UseRoute = useRoute();

  if (route.name === LOGIN) {
    return <Login />;
  }

  return (
    <Layout>
      <AuthenticatedRouter />
    </Layout>
  );
}
