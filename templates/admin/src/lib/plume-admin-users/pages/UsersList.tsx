import React, { useState } from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import { AdminUsersWithIndexedRolesType } from './AdminUsersWithIndexedRolesType';
import PlumeAdminTheme from '../../plume-admin-theme/PlumeAdminTheme';
import { FilterElementProps, SortElementProps } from '../../plume-admin-theme/layout/LayoutProps';
import { AdminUserDetails } from '../api/AdminUserTypes';
import userSorts, { NAME_DESC } from './UserSort';
import MessageService from '../../../i18n/messages/MessageService';
import { filteredList, handleFilterValue } from '../utils/FilterUtils';
import userFilters from './UserFilter';
import UsersListResults from '../components/UsersListResults';

type Props = {
  usersWithRoles?: AdminUsersWithIndexedRolesType;
  usersPath: string,
  isUsersLoading: boolean,
};

export default function UsersList({ usersWithRoles, usersPath, isUsersLoading }: Props) {
  const messages = getGlobalInstance(MessageService).t();
  const theme = getGlobalInstance(PlumeAdminTheme);

  const [currentSorting, setCurrentSorting] = useState<SortElementProps>(NAME_DESC);
  const [currentUserFilters, setCurrentUserFilters] = useState<Map<string, string[]>>(new Map<string, string[]>());
  const [currentSearchBarFilter, setCurrentSearchBarFilter] = useState<string>();

  const applySearchBarFilter = (user: AdminUserDetails) => {
    if (!currentSearchBarFilter || currentSearchBarFilter === "") {
      return true;
    }
    return user.lastName.includes(currentSearchBarFilter)
      || user.firstName.includes(currentSearchBarFilter)
      || user.userName.includes(currentSearchBarFilter)
      || user.email.includes(currentSearchBarFilter)
  }

  const sortedAndFilteredList = () => {
    if (!usersWithRoles) {
      return [];
    }
    // creating a clone in order to leave the original order in the list wherever it is used
    const userList = usersWithRoles.users;
    return filteredList<AdminUserDetails>(userList, currentUserFilters, userFilters(usersWithRoles.roles))
      .filter(applySearchBarFilter)
      .sort(currentSorting.sortFunction);
  }

  return (
    <>
      <theme.pageTitle>{messages['user.title-list']}</theme.pageTitle>
      <theme.pageBloc>
        <theme.pageBlocColumn column="50">
          <theme.listSearchBar
            onSearch={(event: React.ChangeEvent<HTMLInputElement>) => {
              setCurrentSearchBarFilter(event.target.value);
            }}
          />
        </theme.pageBlocColumn>
        <theme.pageBlocColumn column="50">
          <theme.actionsContainer>
            <theme.actionLink
              iconName="add"
              linkTo={`${usersPath}/create`}
            >
              {messages['action.add']}
            </theme.actionLink>
          </theme.actionsContainer>
        </theme.pageBlocColumn>
      </theme.pageBloc>
      <theme.pageBloc>
        <theme.pageBlocColumn column="20">
          <theme.listFilterMenu
            filteredObjectKey="user"
            filterPossibilities={userFilters(usersWithRoles?.roles)}
            onFilter={(filterElement: FilterElementProps<AdminUserDetails>, value: string, isChecked: boolean) => {
              setCurrentUserFilters(handleFilterValue(filterElement, value, isChecked, currentUserFilters));
            }}
            activeFilters={currentUserFilters}
            rawList={usersWithRoles?.users}
          />
        </theme.pageBlocColumn>
        <theme.pageBlocColumn column="80">
          <UsersListResults
            userList={sortedAndFilteredList()}
            userRoles={usersWithRoles?.roles}
            usersPath={usersPath}
            sortConfiguration={{
              sortPossibilities: userSorts(),
              defaultSortPossibility: NAME_DESC,
              onSort: (to: SortElementProps) => {
                setCurrentSorting(to);
              },
            }}
            isLoading={isUsersLoading}
          />
        </theme.pageBlocColumn>
      </theme.pageBloc>
    </>
  );
}
