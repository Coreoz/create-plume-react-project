import { ROUTE_HOME, routes } from '@components/router/RouterDefinition';
import React from 'react';
import { Logger } from 'simple-logging-system';

const logger: Logger = new Logger('ErrorPage');

export default function ErrorPage() {
  logger.warn(`Error page displayed on path ${window.location.href}`);

  return (
    <div>
      <h2>Page not found</h2>
      <div>
        <span>Sorry, we didn&apos;t find this page.&nbsp;</span>
        <a {...routes[ROUTE_HOME]().link}>Go to the home page</a>
      </div>
    </div>
  );
}
