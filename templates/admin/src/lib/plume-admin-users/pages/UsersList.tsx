import React, { useState } from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import { useHistory } from 'react-router-dom';
import { AdminUsersWithIndexedRolesType } from './AdminUsersWithIndexedRolesType';
import PlumeAdminTheme from '../../plume-admin-theme/PlumeAdminTheme';
import UserTile from '../components/UserTile';
import { FilterElementProps, SortElementProps } from '../../plume-admin-theme/layout/LayoutProps';
import { AdminUserDetails } from '../api/AdminUserTypes';
import { NAME_ASC, NAME_DESC } from './UserSort';
import MessageService from '../../../i18n/messages/MessageService';
import { filteredList, handleFilterValue } from '../utils/FilterUtils';
import { NAME, ROLE } from './UserFilter';

type Props = {
  usersWithRoles?: AdminUsersWithIndexedRolesType;
  usersPath: string,
  isUsersLoading: boolean,
};

export default function UsersList({ usersWithRoles, usersPath, isUsersLoading }: Props) {
  const messages = getGlobalInstance(MessageService).t();
  const theme = getGlobalInstance(PlumeAdminTheme);

  const history = useHistory();
  const [currentSorting, setCurrentSorting] = useState<SortElementProps>(NAME_DESC);
  const [currentUserFilters, setCurrentUserFilters] = useState<Map<string, string[]>>(new Map<string, string[]>());

  const userFilters: { [key: string]: FilterElementProps<AdminUserDetails> } =
    Object.fromEntries(
      new Map<string, FilterElementProps<AdminUserDetails>>(
        [NAME, ROLE(usersWithRoles?.roles || new Map<string, string>())].map(
          (filterPossibility) => [filterPossibility.filterKey, filterPossibility]
        )
      )
    );

  const userSorts: { [key: string]: SortElementProps } =
    Object.fromEntries(
      new Map<string, SortElementProps>(
        [NAME_DESC, NAME_ASC].map(
          (sortPossibility) => [sortPossibility.sortKey, sortPossibility]
        )
      )
    );

  const sortedAndFilteredList = () => {
    // creating a clone in order to leave the original order in the list wherever it is used
    const userList = [...(usersWithRoles?.users || [])];
    return filteredList<AdminUserDetails>(userList, currentUserFilters, userFilters)
      .sort(currentSorting.sortFunction);
  }

  return (
    <>
      <theme.pageTitle>{messages['user.title-list']}</theme.pageTitle>
      <theme.actionsContainer>
        <theme.actionLink
          iconName="add"
          linkTo={`${usersPath}/create`}
        >
          {messages['action.add']}
        </theme.actionLink>
      </theme.actionsContainer>
      <theme.pageBloc>
        <theme.pageBlocColumn column="20">
          <theme.listFilterMenu
            filteredObjectKey="user"
            filterPossibilities={userFilters}
            onFilter={(filterElement: FilterElementProps<AdminUserDetails>, value: string, isChecked: boolean) => {
              setCurrentUserFilters(handleFilterValue(filterElement, value, isChecked, currentUserFilters));
            }}
            activeFilters={currentUserFilters}
            rawList={usersWithRoles?.users}
          />
        </theme.pageBlocColumn>
        <theme.pageBlocColumn column="80">
          <theme.listHeader
            listLength={usersWithRoles?.users.length || 0}
            sortConfiguration={{
              sortPossibilities: userSorts,
              defaultSortPossibility: NAME_DESC,
              onSort: (to: SortElementProps) => {
                setCurrentSorting(to);
              },
            }}
          />
          <theme.listElements isLoading={isUsersLoading} listLength={usersWithRoles?.users.length || 0}>
            {
              usersWithRoles
              && React.Children.toArray(
                sortedAndFilteredList()
                  .map((user: AdminUserDetails) => (
                    <UserTile
                      onClick={() => {
                        history.push(`${usersPath}/${user.id}`)
                      }}
                      user={user}
                      roles={usersWithRoles.roles}
                    />
                  ))
              )
            }
          </theme.listElements>
        </theme.pageBlocColumn>
      </theme.pageBloc>
    </>
  );
}
