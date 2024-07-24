import usePlumeTheme, {
  PlumeAdminThemeComponents,
} from '@components/hooks/ThemeHook';
import useMessages, { Messages } from '@i18n/hooks/messagesHook';
import { CREATE } from '@lib/plume-admin-users/router/UserRoutes';
import dayjs from 'dayjs';
import React from 'react';
import { Link } from 'react-router-dom';
import ActionStyle from '../../plume-admin-theme/action/ActionStyle';
import { AdminUserDetails } from '../api/AdminUserTypes';
import {
  AdminUsersWithIndexedRolesType,
} from './AdminUsersWithIndexedRolesType';

type Props = {
  usersWithRoles?: AdminUsersWithIndexedRolesType,
};

export default function UsersList({ usersWithRoles }: Props) {
  const { messages }: Messages = useMessages();
  const {
    panel: Panel,
    panelTitle: PanelTitle,
    panelContent: PanelContent,
    panelContentElement: PanelContentElement,
    panelContentElementColumn: PanelContentElementColumn,
    actionsContainer: ActionContainer,
    actionLink: ActionLink,
  }: PlumeAdminThemeComponents = usePlumeTheme();

  return (
    <Panel>
      <PanelTitle>
        {messages.user.title_list}
      </PanelTitle>
      <PanelContent>
        <PanelContentElement columns={5}>
          <PanelContentElementColumn width={4}>
            {usersWithRoles && (
              <table>
                <thead>
                  <tr>
                    <th>{messages.users.userName}</th>
                    <th>{messages.users.email}</th>
                    <th>{messages.users.firstName}</th>
                    <th>{messages.users.lastName}</th>
                    <th>{messages.users.role}</th>
                    <th>{messages.label.creation_date}</th>
                  </tr>
                </thead>
                <tbody>
                  {usersWithRoles.users.map((user: AdminUserDetails) => (
                    <tr key={user.id}>
                      <td>
                        <Link
                          to={user.id}
                        >
                          {user.userName}
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={user.id}
                        >
                          {user.email}
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={user.id}
                        >
                          {user.firstName}
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={user.id}
                        >
                          {user.lastName}
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={user.id}
                        >
                          {usersWithRoles.roles.get(user.idRole)}
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={user.id}
                        >
                          {dayjs(user.creationDate).format('L LT')}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {!usersWithRoles && <span>{messages.label.loading}</span>}
          </PanelContentElementColumn>
          <PanelContentElementColumn width={1}>
            <ActionContainer position="end">
              <ActionLink
                icon="add"
                linkTo={CREATE}
                style={ActionStyle.PRIMARY}
              >
                {messages.action.add}
              </ActionLink>
            </ActionContainer>
          </PanelContentElementColumn>
        </PanelContentElement>
      </PanelContent>
    </Panel>
  );
}
