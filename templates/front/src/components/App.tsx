import React, { useMemo } from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Logger } from 'simple-logging-system';
import Home from './pages/Home';
import Layout from './layout/Layout';
import ErrorPage from './pages/ErrorPage';

const logger = new Logger('App');

export default function App() {
  const router = useMemo(() => createBrowserRouter([
    {
      path: '/',
      element: <Layout><Outlet /></Layout>,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
  ]), []);

  logger.info('Render App');
  return <RouterProvider router={router} />;
}
