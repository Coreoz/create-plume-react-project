import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { AdminUsersWithIndexedRolesType } from './AdminUsersWithIndexedRolesType';
import PlumeAdminTheme from '../../plume-admin-theme/PlumeAdminTheme';
import PlumeMessageResolver from '../../plume-messages/MessageResolver';

type Props = {
  usersWithRoles?: AdminUsersWithIndexedRolesType;
  usersPath: string,
};

export default class UsersList {
  constructor(private readonly theme: PlumeAdminTheme, private readonly messages: PlumeMessageResolver) {
  }

  render = ({ usersWithRoles, usersPath }: Props) => (
    <>
      <this.theme.pageTitle>{this.messages.t('user.title-list')}</this.theme.pageTitle>
      <this.theme.actionsContainer>
        <this.theme.actionLink
          iconName="add"
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
                <th>{this.messages.t('users.USERNAME')}</th>
                <th>{this.messages.t('users.EMAIL')}</th>
                <th>{this.messages.t('users.FIRSTNAME')}</th>
                <th>{this.messages.t('users.LASTNAME')}</th>
                <th>{this.messages.t('users.ROLE')}</th>
                <th>{this.messages.t('label.creation-date')}</th>
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
