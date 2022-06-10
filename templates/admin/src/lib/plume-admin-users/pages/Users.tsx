import React, { useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import PlumeAdminTheme from '../../plume-admin-theme/PlumeAdminTheme';
import { useOnComponentMounted } from '../../react-hooks-alias/ReactHooksAlias';
import { AdminUsersDetails } from '../api/AdminUserTypes';
import UserApi from '../api/UserApi';
import { AdminUsersWithIndexedRolesType } from './AdminUsersWithIndexedRolesType';
import UsersEdit from './UsersEdit';
import UsersList from './UsersList';

export default class Users {
  constructor(
    private readonly theme: PlumeAdminTheme,
    private readonly userApi: UserApi,
    private readonly usersEdit: UsersEdit,
    private readonly usersList: UsersList) {
  }

  private static setUsersAndIndexRoles(usersWithRoles: AdminUsersDetails) {
    return {
      users: usersWithRoles.users,
      roles: new Map<string, string>(usersWithRoles.roles.map((role) => [role.id, role.label])),
    };
  }

  render = () => {
    const { path } = useRouteMatch();

    const [usersWithRoles, setUsersWithRoles] = useState<AdminUsersWithIndexedRolesType>();

    const setUsersAndIndexRoles = (newUsersWithRoles: AdminUsersDetails) => setUsersWithRoles(
      Users.setUsersAndIndexRoles(newUsersWithRoles),
    );

    // TODO bien ici ça a un sens de récupérer les rôles car ils sont utilisés partout,
    //  la liste d'utilisateurs ne devrait être récupérée que sur la page liste
    //  et l'utilisateur en cours de modification ne devrait être récupéré que sur la page détail
    const updateUsersAndRoles = () => this
      .userApi
      .fetchAll()
      .then(setUsersAndIndexRoles);

    // users are loaded from the main component, so it can be reused in the two sub component list & edit
    useOnComponentMounted(updateUsersAndRoles);

    return (
      <this.theme.panel>
        <this.usersList.render usersPath={path} usersWithRoles={usersWithRoles} />
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
      </this.theme.panel>
    );
  };
}
