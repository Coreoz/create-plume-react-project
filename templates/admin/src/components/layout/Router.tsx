import React from 'react';
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { getGlobalInstance } from 'plume-ts-di';
import Home from '../features/Home';
import Users from '../../lib/plume-admin-users/pages/Users';
import PermissionRoute from '../theme/routes/PermissionRoute';
import Permission from '../../services/session/Permission';
import { HOME, USERS } from '../Routes';

export default function Router() {
  const users: Users = getGlobalInstance(Users);

  return (
    <Routes>
      <Route
        path={`${USERS}/*`}
        element={
          <PermissionRoute permission={Permission.MANAGE_USERS}><users.render /></PermissionRoute>
      }
      />
      <Route path={HOME} element={<Home />} />
      <Route path="*" element={<Navigate to={{ pathname: HOME }} />} />
    </Routes>
  );
}
