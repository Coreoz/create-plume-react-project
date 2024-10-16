import Layout from '@components/layout/Layout';
import NotFoundPage from '@components/pages/error/NotFoundPage';
import HelloWorld from '@components/pages/home/HelloWorld';
import Home from '@components/pages/home/Home';
import Route from '@components/theme/routes/route/Route';
import React from 'react';
import { Logger } from 'simple-logging-system';
import { ROUTE_HOME, ROUTE_HELLO } from '../router/Router';

const logger: Logger = new Logger('App');

export default function App() {
  logger.info('Render App');

  return (
    <Layout>
      <Route route={ROUTE_HOME} Component={Home} />
      <Route route={ROUTE_HELLO} Component={HelloWorld} />
      <NotFoundPage />
    </Layout>
  );
}
