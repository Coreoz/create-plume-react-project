import dayjs from 'dayjs';
import React from 'react';
import { Link } from 'react-router-dom';
import PlumeAdminTheme from '../../plume-admin-theme/PlumeAdminTheme';
import PlumeMessageResolver from '../../plume-messages/MessageResolver';
import { AdminUsersWithIndexedRolesType } from './AdminUsersWithIndexedRolesType';

type Props = {
  usersWithRoles?: AdminUsersWithIndexedRolesType;
  usersPath: string,
};

export default class UsersList {
  constructor(private readonly theme: PlumeAdminTheme, private readonly messages: PlumeMessageResolver) {
  }

  render = ({ usersWithRoles, usersPath }: Props) => (
    <>
      <this.theme.pageTitle>{this.messages.t('user.title_list')}</this.theme.pageTitle>
      <this.theme.actionsContainer>
        <this.theme.actionLink
          icon="add"
          linkTo={`${usersPath}/create`}
        >
          {this.messages.t('action.add')}
        </this.theme.actionLink>
      </this.theme.actionsContainer>
      <this.theme.panel>
        {usersWithRoles && (
          <table>
            <thead>
              <tr>
                <th>{this.messages.t('users.userName')}</th>
                <th>{this.messages.t('users.email')}</th>
                <th>{this.messages.t('users.firstName')}</th>
                <th>{this.messages.t('users.lastName')}</th>
                <th>{this.messages.t('users.role')}</th>
                <th>{this.messages.t('label.creation_date')}</th>
              </tr>
            </thead>
            <tbody>
              {usersWithRoles.users.map((user) => (
                <tr key={user.id}>
                  <td><Link to={`${usersPath}/${user.id}`}>{user.userName}</Link></td>
                  <td><Link to={`${usersPath}/${user.id}`}>{user.email}</Link></td>
                  <td><Link to={`${usersPath}/${user.id}`}>{user.firstName}</Link></td>
                  <td><Link to={`${usersPath}/${user.id}`}>{user.lastName}</Link></td>
                  <td><Link to={`${usersPath}/${user.id}`}>{usersWithRoles.roles.get(user.idRole)}</Link></td>
                  <td><Link to={`${usersPath}/${user.id}`}>{dayjs(user.creationDate).format('L LT')}</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!usersWithRoles && <span>{this.messages.t('label.loading')}</span>}
      </this.theme.panel>
    </>
  );
}
