import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import useMessages from '../../../i18n/hooks/messagesHook';
import { SortMenuProps } from '../../plume-admin-theme/list/sort/SortProps';
import PlumeAdminTheme from '../../plume-admin-theme/PlumeAdminTheme';
import { AdminUserDetails } from '../api/AdminUserTypes';
import UserTile from './UserTile';

type Props = {
  userList: AdminUserDetails[],
  userRoles: Map<string, string> | undefined,
  sortConfiguration: SortMenuProps,
  usersPath: string,
  isLoading?: boolean,
};

function UsersListResults(
  {
    userList, userRoles, sortConfiguration, usersPath, isLoading,
  }: Props,
) {
  const { messages } = useMessages();
  const theme: PlumeAdminTheme = getGlobalInstance(PlumeAdminTheme);
  const navigate: NavigateFunction = useNavigate();

  return (
    <>
      <theme.listHeader
        listTitle={messages.user.list.count(userList.length)}
        sortConfiguration={sortConfiguration}
      />
      <theme.listElements isLoading={isLoading} listLength={userList.length}>
        {
          React.Children.toArray(
            userList.map((user: AdminUserDetails) => (
              <UserTile
                onClick={() => {
                  navigate(`${usersPath}/${user.id}`);
                }}
                user={user}
                roles={userRoles}
              />
            )),
          )
        }
      </theme.listElements>
    </>
  );
}

export default (UsersListResults);
