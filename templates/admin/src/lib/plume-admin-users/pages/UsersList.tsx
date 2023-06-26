import dayjs from 'dayjs';
import React from 'react';
import { Link } from 'react-router-dom';
import PlumeAdminTheme from '../../plume-admin-theme/PlumeAdminTheme';
import PlumeMessageResolver from '../../plume-messages/MessageResolver';
import PlumeMessageResolverService from '../../plume-messages/MessageResolverService';
import useMessagesResolver from '../../plume-messages/messagesResolveHook';
import { AdminUserDetails } from '../api/AdminUserTypes';
import { AdminUsersWithIndexedRolesType } from './AdminUsersWithIndexedRolesType';

type Props = {
  usersWithRoles?: AdminUsersWithIndexedRolesType,
  usersPath: string,
};

export default class UsersList {
  constructor(private readonly theme: PlumeAdminTheme, private readonly messageService: PlumeMessageResolverService) {
  }

  render = ({ usersWithRoles, usersPath }: Props) => {
    const messages: PlumeMessageResolver = useMessagesResolver(this.messageService);

    return (
      <>
        <this.theme.pageTitle>{messages.t('user.title_list')}</this.theme.pageTitle>
        <this.theme.actionsContainer>
          <this.theme.actionLink
            icon="add"
            linkTo={`${usersPath}/create`}
          >
            {messages.t('action.add')}
          </this.theme.actionLink>
        </this.theme.actionsContainer>
        <this.theme.panel>
          {usersWithRoles && (
            <table>
              <thead>
              <tr>
                <th>{messages.t('users.userName')}</th>
                <th>{messages.t('users.email')}</th>
                <th>{messages.t('users.firstName')}</th>
                <th>{messages.t('users.lastName')}</th>
                <th>{messages.t('users.role')}</th>
                <th>{messages.t('label.creation_date')}</th>
              </tr>
              </thead>
              <tbody>
              {usersWithRoles.users.map((user: AdminUserDetails) => (
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
          {!usersWithRoles && <span>{messages.t('label.loading')}</span>}
        </this.theme.panel>
      </>
    );
  };
}
