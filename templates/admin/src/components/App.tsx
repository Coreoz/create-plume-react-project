import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Logger } from 'simple-logging-system';
import Router from '../router/Router';
import { RouteProvider } from '../router/RouterDefinition';
import GlobalErrorBoundary from './theme/GlobalErrorBoundary';

const logger: Logger = new Logger('App');

export default function App() {
  logger.info('Render App');

  return (
    <GlobalErrorBoundary>
      <RouteProvider>
        <Router />
        <ToastContainer />
      </RouteProvider>
    </GlobalErrorBoundary>
  );
}
