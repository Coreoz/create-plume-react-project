import { getGlobalInstance } from 'plume-ts-di';
import React, { useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import {
  applyFilters,
  checkValueForFilter,
  createFiltersFromSelected,
  createIncludesFilter,
  rawIncludes,
} from '../../../components/theme/list/filter/SearchFilters';
import useMessages from '../../../i18n/hooks/messagesHook';
import ActionStyle from '../../plume-admin-theme/action/ActionStyle';
import { SortElementProps } from '../../plume-admin-theme/list/sort/SortProps';
import PlumeAdminTheme from '../../plume-admin-theme/PlumeAdminTheme';
import { AdminUserDetails } from '../api/AdminUserTypes';
import UsersListResults from '../components/UsersListResults';
import {
  AdminUsersWithIndexedRolesType,
} from './AdminUsersWithIndexedRolesType';
import userFilters from './UserFilter';
import userSortsList, { NAME_ASC } from './UserSort';

type Props = {
  usersWithRoles?: AdminUsersWithIndexedRolesType,
  usersPath: string,
  isUsersLoading: boolean,
};

export default function UsersList({ usersWithRoles, usersPath, isUsersLoading }: Props) {
  const { messages } = useMessages();
  const theme: PlumeAdminTheme = getGlobalInstance(PlumeAdminTheme);
  const navigate: NavigateFunction = useNavigate();

  const [currentSorting, setCurrentSorting] = useState<SortElementProps>(NAME_ASC);
  const [currentUserFilters, setCurrentUserFilters] = useState<Map<string, string[]>>(new Map<string, string[]>());
  const [currentSearchBarFilter, setCurrentSearchBarFilter] = useState<string>();

  const applySearchBarFilter = (user: AdminUserDetails) => {
    if (!currentSearchBarFilter || currentSearchBarFilter === '') {
      return true;
    }
    return rawIncludes(user.lastName, currentSearchBarFilter)
      || rawIncludes(user.firstName, currentSearchBarFilter)
      || rawIncludes(user.userName, currentSearchBarFilter)
      || rawIncludes(user.email, currentSearchBarFilter);
  };

  const sortedAndFilteredList = (): AdminUserDetails[] => {
    if (!usersWithRoles) {
      return [];
    }
    // creating a clone in order to leave the original order in the list wherever it is used
    const userList: AdminUserDetails[] = usersWithRoles.users;
    const filtersToApply: ((value: AdminUserDetails) => boolean)[] = createFiltersFromSelected(
      currentUserFilters,
      userFilters(usersWithRoles.roles),
      createIncludesFilter,
    );
    return userList
      .filter(applySearchBarFilter)
      .filter(applyFilters<AdminUserDetails>(filtersToApply))
      .sort(currentSorting.sortFunction);
  };

  return (
    <>
      <theme.pageTitle>{messages.user.title_list}</theme.pageTitle>
      <theme.pageBloc>
        <theme.pageBlocColumn columnWidth="50">
          <theme.searchBar
            onSearch={(event: React.ChangeEvent<HTMLInputElement>) => {
              setCurrentSearchBarFilter(event.target.value);
            }}
          />
        </theme.pageBlocColumn>
        <theme.pageBlocColumn columnWidth="50">
          <theme.actionsContainer>
            <theme.actionButton
              icon="add"
              style={ActionStyle.PRIMARY}
              onClick={() => {
                navigate(`${usersPath}/create`);
              }}
            >
              {messages.user.add}
            </theme.actionButton>
          </theme.actionsContainer>
        </theme.pageBlocColumn>
      </theme.pageBloc>
      <theme.pageBloc>
        <theme.pageBlocColumn columnWidth="20">
          <theme.multipleChoiceObjectFilterMenu
            filterMenuKey="user"
            filters={userFilters(usersWithRoles?.roles)}
            onFilterValueClicked={(filterElementKey: string, valueSelected: string, isChecked: boolean) => {
              setCurrentUserFilters(
                checkValueForFilter(filterElementKey, valueSelected, isChecked, currentUserFilters),
              );
            }}
            selectedValues={currentUserFilters}
            rawList={usersWithRoles?.users || []}
          />
        </theme.pageBlocColumn>
        <theme.pageBlocColumn columnWidth="80">
          <UsersListResults
            userList={sortedAndFilteredList()}
            userRoles={usersWithRoles?.roles}
            usersPath={usersPath}
            sortConfiguration={{
              sortedObjectKey: 'user',
              sortPossibilities: userSortsList(),
              defaultSortPossibility: NAME_ASC,
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
