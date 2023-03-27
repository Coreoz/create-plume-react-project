import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Users from '../../lib/plume-admin-users/pages/Users';
import Permission from '../../services/session/Permission';
import Home from '../features/Home';
import { HOME, USERS } from '../Routes';
import PermissionRoute from '../theme/routes/PermissionRoute';

export default function Router() {
  const users = getGlobalInstance(Users);

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
