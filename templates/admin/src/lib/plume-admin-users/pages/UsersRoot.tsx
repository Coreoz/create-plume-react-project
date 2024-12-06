import Users from '@lib/plume-admin-users/pages/Users';
import { UserRouterProvider } from '@lib/plume-admin-users/router/UserRouter';
import React from 'react';

export default function UsersRoot() {
  return (
    <UserRouterProvider>
      <Users />
    </UserRouterProvider>
  );
}
