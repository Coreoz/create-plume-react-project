import Link from '@components/theme/routes/Link';
import React from 'react';
import { Logger } from 'simple-logging-system';
import { ROUTE_HOME, routes } from '../../../router/Router';

const logger: Logger = new Logger('ErrorPage');

export default function NotFoundPage() {
  logger.warn('User tried to access a non-existing page : ' + window.location.href);

  return (
    <div>
      <h2>Page not found</h2>
      <div>
        <span>Sorry, we didn&apos;t find this page.&nbsp;</span>
        <Link to={routes[ROUTE_HOME]()}>Go to the home page</Link>
      </div>
    </div>
  );
}
