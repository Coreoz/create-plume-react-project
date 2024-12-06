import React from 'react';
import { ToastContainer } from 'react-toastify';
import Router from '../router/Router';
import { RouteProvider } from '../router/RouterDefinition';
import GlobalErrorBoundary from './theme/GlobalErrorBoundary';

export default function App() {
  return (
    <GlobalErrorBoundary>
      <RouteProvider>
        <Router />
        <ToastContainer />
      </RouteProvider>
    </GlobalErrorBoundary>
  );
}
