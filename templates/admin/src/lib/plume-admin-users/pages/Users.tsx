import React, { useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import UserApi from '../api/UserApi';
import UsersList from './UsersList';
import UsersEdit from './UsersEdit';
import { AdminUsersDetails } from '../api/AdminUserTypes';
import { useOnComponentMounted } from '../../react-hooks-alias/ReactHooksAlias';
import { AdminUsersWithIndexedRolesType } from './AdminUsersWithIndexedRolesType';
import useLoader from '../../plume-http-react-hook-loader/promiseLoaderHook';

export default class Users {
  constructor(
    private readonly userApi: UserApi,
    private readonly usersEdit: UsersEdit) {
  }

  private static setUsersAndIndexRoles(usersWithRoles: AdminUsersDetails) {
    return {
      users: usersWithRoles.users,
      roles: new Map<string, string>(usersWithRoles.roles.map((role) => [role.id, role.label])),
    };
  }

  render = () => {
    const { path } = useRouteMatch();

    const userLoader = useLoader();

    const [usersWithRoles, setUsersWithRoles] = useState<AdminUsersWithIndexedRolesType>();

    const setUsersAndIndexRoles = (newUsersWithRoles: AdminUsersDetails) => setUsersWithRoles(
      Users.setUsersAndIndexRoles(newUsersWithRoles),
    );

    // TODO bien ici ça a un sens de récupérer les rôles car ils sont utilisés partout,
    //  la liste d'utilisateurs ne devrait être récupérée que sur la page liste
    //  et l'utilisateur en cours de modification ne devrait être récupéré que sur la page détail
    const updateUsersAndRoles = () => userLoader.monitor(
      this.userApi
        .fetchAll()
        .then(setUsersAndIndexRoles)
    );

    // users are loaded from the main component, so it can be reused in the two sub component list & edit
    useOnComponentMounted(updateUsersAndRoles);

    return (
      <div className="admin-page">
        <UsersList
          usersPath={path}
          usersWithRoles={usersWithRoles}
          isUsersLoading={userLoader.isLoading}
        />
        <Switch>
          <Route path={`${path}/create`}>
            <this.usersEdit.render
              usersPath={path}
              usersWithRoles={usersWithRoles}
              updateUsersAndRoles={updateUsersAndRoles}
            />
          </Route>
          <Route path={`${path}/:userId`}>
            <this.usersEdit.render
              usersPath={path}
              usersWithRoles={usersWithRoles}
              updateUsersAndRoles={updateUsersAndRoles}
            />
          </Route>
        </Switch>
      </div>
    );
  };
}
