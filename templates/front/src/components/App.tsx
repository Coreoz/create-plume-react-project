import Router from '@components/router/Router';
import { RouteProvider } from '@components/router/RouterDefinition';
import React from 'react';
import { Logger } from 'simple-logging-system';
import GlobalErrorBoundary from './theme/GlobalErrorBoundary';

const logger: Logger = new Logger('App');

export default function App() {
  logger.info('Render App');

  return (
    <GlobalErrorBoundary>
      <RouteProvider>
        <Router />
      </RouteProvider>
    </GlobalErrorBoundary>
  );
}
