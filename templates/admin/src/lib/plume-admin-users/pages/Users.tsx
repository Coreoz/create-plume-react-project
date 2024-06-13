import { USERS } from '@components/Routes';
import UserRouter from '@lib/plume-admin-users/router/UserRouter';
import { getGlobalInstance } from 'plume-ts-di';
import React, { useState } from 'react';
import { useOnComponentMounted } from '@lib/react-hooks-alias/ReactHooksAlias';
import { AdminRole, AdminUsersDetails } from '../api/AdminUserTypes';
import UserApi from '../api/UserApi';
import {
  AdminUsersWithIndexedRolesType,
} from './AdminUsersWithIndexedRolesType';
import UsersList from './UsersList';

const usersPath: string = USERS;

const setUsersAndIndexRoles = (usersWithRoles: AdminUsersDetails) => ({
  users: usersWithRoles.users,
  roles: new Map<string, string>(usersWithRoles.roles.map((role: AdminRole) => [role.id, role.label])),
});

export default function Users() {
  const userApi: UserApi = getGlobalInstance(UserApi);

  const [usersWithRoles, setUsersWithRoles] = useState<AdminUsersWithIndexedRolesType>();

  // TODO bien ici ça a un sens de récupérer les rôles car ils sont utilisés partout,
  //  la liste d'utilisateurs ne devrait être récupérée que sur la page liste
  //  et l'utilisateur en cours de modification ne devrait être récupéré que sur la page détail
  const updateUsersAndRoles = () => userApi
    .fetchAll()
    .then((newUsersWithRoles: AdminUsersDetails) => setUsersWithRoles(
      setUsersAndIndexRoles(newUsersWithRoles),
    ));

  // users are loaded from the main component, so it can be reused in the two sub component list & edit
  useOnComponentMounted(() => {
    updateUsersAndRoles();
  });

  return (
    <>
      <UsersList usersWithRoles={usersWithRoles} />
      <UserRouter
        usersPath={usersPath}
        usersWithRoles={usersWithRoles}
        updateUsersAndRoles={updateUsersAndRoles}
      />
    </>
  );
}
