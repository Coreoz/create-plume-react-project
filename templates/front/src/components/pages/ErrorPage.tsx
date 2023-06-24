import Layout from '@components/layout/Layout';
import React from 'react';
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';
import { Logger } from 'simple-logging-system';
import { HOME } from '../Routes';

const logger = new Logger('ErrorPage');

export default function ErrorPage() {
  const error = useRouteError();

  logger.warn('Error page displayed', { error });

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <Layout>
        <div>
          <h2>Page not found</h2>
          <div>Sorry, we didn&apos;t find this page. <Link to={HOME}>Go to the home page</Link></div>
        </div>
      </Layout>
    );
  }

  throw error;
}
