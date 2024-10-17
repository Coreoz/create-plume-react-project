import Layout from '@components/layout/Layout';
import NotFoundPage from '@components/pages/error/NotFoundPage';
import Home from '@components/pages/home/Home';
import React from 'react';
import { Logger } from 'simple-logging-system';
import { ROUTE_HOME, UseRoute, useRoute } from '../router/Router';

const logger: Logger = new Logger('App');

export default function App() {
  const route: UseRoute = useRoute();

  logger.info('Render App');

  return (
    <Layout>
      {route.name === ROUTE_HOME && <Home />}
      {route.name === false && <NotFoundPage />}
    </Layout>
  );
}
