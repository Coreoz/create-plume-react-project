import React, { useMemo } from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Logger } from 'simple-logging-system';
import Layout from '@components/layout/Layout';
import ErrorPage from '@components/pages/error/ErrorPage';
import Home from '@components/pages/home/Home';
import Routes from '../routes/Routes';

const logger: Logger = new Logger('App');

export default function App() {
  const router: ReturnType<typeof createBrowserRouter> = useMemo(() => createBrowserRouter([
    {
      path: '/',
      element: <Layout><Outlet /></Layout>,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: Routes.PARAMETRIZED_EXAMPLE.getRawPath(),
          element: <Home />,
        },
      ],
    },
  ]), []);

  logger.info('Render App');
  return <RouterProvider router={router} />;
}
