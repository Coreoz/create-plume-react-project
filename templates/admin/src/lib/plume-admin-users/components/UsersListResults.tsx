import React from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import { useHistory } from 'react-router-dom';
import PlumeAdminTheme from '../../plume-admin-theme/PlumeAdminTheme';
import { SortMenuProps } from '../../plume-admin-theme/list/sort/SortProps';
import { AdminUserDetails } from '../api/AdminUserTypes';
import UserTile from './UserTile';

type Props = {
  userList: AdminUserDetails[],
  userRoles: Map<string, string> | undefined,
  sortConfiguration: SortMenuProps,
  usersPath: string,
  isLoading?: boolean,
}

function UsersListResults({ userList, userRoles, sortConfiguration, usersPath, isLoading }: Props) {
  const theme = getGlobalInstance(PlumeAdminTheme);
  const history = useHistory();

  return (
    <>
      <theme.listHeader
        listLength={userList.length}
        sortConfiguration={sortConfiguration}
      />
      <theme.listElements isLoading={isLoading} listLength={userList.length}>
        {
          React.Children.toArray(
            userList.map((user: AdminUserDetails) => (
              <UserTile
                onClick={() => {
                  history.push(`${usersPath}/${user.id}`)
                }}
                user={user}
                roles={userRoles}
              />
            ))
          )
        }
      </theme.listElements>
    </>
  )
}

export default (UsersListResults);
