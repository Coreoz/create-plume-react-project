import Home from '@components/features/Home';
import Layout from '@components/layout/Layout';
import { HOME, LOGIN, USERS } from '@components/Routes';
import PermissionRoute from '@components/theme/routes/PermissionRoute';
import PrivateRoute from '@components/theme/routes/PrivateRoute';
import Users from '@lib/plume-admin-users/pages/Users';
import Permission from '@services/session/Permission';
import React, { useMemo } from 'react';
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Logger } from 'simple-logging-system';
import Login from './features/login/Login';
import GlobalErrorBoundary from './theme/GlobalErrorBoundary';

const logger: Logger = new Logger('App');
// To make the application have a base path that starts with /admin:
// - Replace the line bellow by: const basePath = '/admin';
// - Add the base attribute in the vite.config.ts file
const basePath: string = '/';

// react router redirection is not made anymore :(, see https://github.com/remix-run/react-router/issues/8427
if (window && !window.location.pathname.startsWith(basePath)) {
  window.history.replaceState('', '', basePath + window.location.pathname);
}

export default function App() {
  const router: ReturnType<typeof createBrowserRouter> = useMemo(() => createBrowserRouter([
    {
      path: LOGIN,
      element: (
        <Login />
      ),
    },
    {
      path: '/',
      element: (
        <PrivateRoute>
          <Layout>
            <Outlet />
          </Layout>
        </PrivateRoute>
      ),
      children: [
        {
          path: HOME,
          element: (
            <Home />
          ),
        },
        {
          path: `${USERS}/*`,
          element: (
            <PermissionRoute permission={Permission.MANAGE_USERS}>
              <Users />
            </PermissionRoute>
          ),
        },
        {
          path: '*',
          element: (
            <Navigate to={HOME} />
          ),
        },
      ],
    },
  ], { basename: basePath }), []);

  logger.info('Render App');
  return (
    <GlobalErrorBoundary>
      <ToastContainer />
      <RouterProvider router={router} />
    </GlobalErrorBoundary>
  );
}
