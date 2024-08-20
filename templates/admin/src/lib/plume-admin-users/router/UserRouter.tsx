import {
  AdminUsersWithIndexedRolesType,
} from '@lib/plume-admin-users/pages/AdminUsersWithIndexedRolesType';
import { CREATE, UPDATE } from '@lib/plume-admin-users/router/UserRoutes';
import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import UsersEdit from '../pages/UsersEdit';

type Props = {
  usersPath: string,
  usersWithRoles?: AdminUsersWithIndexedRolesType,
  updateUsersAndRoles: () => void,
};

function UserRouter({
  usersPath,
  usersWithRoles,
  updateUsersAndRoles,
}: Props) {
  return useRoutes([
    {
      path: CREATE,
      element: (
        <UsersEdit
          usersPath={usersPath}
          usersWithRoles={usersWithRoles}
          updateUsersAndRoles={updateUsersAndRoles}
        />
      ),
    },
    {
      path: UPDATE,
      element: (
        <UsersEdit
          usersPath={usersPath}
          usersWithRoles={usersWithRoles}
          updateUsersAndRoles={updateUsersAndRoles}
        />
      ),
    },
    {
      path: '*',
      element: (
        <Navigate to={`/${usersPath}`} />
      ),
    },
  ]);
}

export default UserRouter;
