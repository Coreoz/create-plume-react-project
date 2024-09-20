import usePlumeTheme, { PlumeAdminThemeComponents } from '@components/hooks/ThemeHook';
import { ActionButton } from '@components/theme/action/Actions';
import useMessages, { Messages } from '@i18n/hooks/messagesHook';
import { CREATE } from '@lib/plume-admin-users/router/UserRoutes';
import filterFunctions from '@lib/plume-search/filters/FilterFunctions';
import useSearchFilter, { UseSearchFilterHook } from '@lib/plume-search/filters/SearchFilterHook';
import useSearchLoadedData from '@lib/plume-search/SearchLoadedDataHook';
import { SearchDataHookType } from '@lib/plume-search/SearchTypes';
import useSearchSort from '@lib/plume-search/sorts/SearchSortHook';
import sortFunctions from '@lib/plume-search/sorts/SortFunctions';
import { SearchSortType } from '@lib/plume-search/sorts/SortTypes';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import { Link } from 'react-router-dom';
import ActionStyle from '../../plume-admin-theme/action/ActionStyle';
import { AdminUserDetails } from '../api/AdminUserTypes';
import { AdminUsersWithIndexedRolesType } from './AdminUsersWithIndexedRolesType';

type Props = {
  usersWithRoles?: AdminUsersWithIndexedRolesType,
};

export enum CreationDateOption {
  LESS_THAN_15_DAYS = 'less_than_15_days',
  BETWEEN_15_45_DAYS = 'between_15_45_days',
  MORE_THAN_45_DAYS = 'more_than_45_days',
}

type UserSearch = {
  userName: string,
  lastLoginDate: CreationDateOption,
  roles: string[],
};

enum UserSort {
  USER_NAME = 'USER_NAME',
  CREATION_DATE = 'CREATION_DATE',
}

const filterLastLoginDateFromOption = (value: AdminUserDetails, option: CreationDateOption | undefined) => {
  const daysDifferenceBetweenCreationAndToday: number = dayjs(value.creationDate).diff(dayjs());
  if (option === CreationDateOption.MORE_THAN_45_DAYS) {
    return daysDifferenceBetweenCreationAndToday > 45;
  }
  if (option === CreationDateOption.LESS_THAN_15_DAYS) {
    return daysDifferenceBetweenCreationAndToday < 15;
  }
  if (option === CreationDateOption.BETWEEN_15_45_DAYS) {
    return !(daysDifferenceBetweenCreationAndToday < 15 || daysDifferenceBetweenCreationAndToday > 45);
  }
  return true;
};

export default function UsersList({ usersWithRoles }: Props) {
  const { messages }: Messages = useMessages();
  const {
    panel: Panel,
    panelTitle: PanelTitle,
    panelContent: PanelContent,
    panelContentElement: PanelContentElement,
    panelContentElementColumn: PanelContentElementColumn,
    listHead: ListHead,
    actionsContainer: ActionContainer,
    actionLink: ActionLink,
    filterMenu: FilterMenu,
    filterGroup: FilterGroup,
    filterInputSearch: FilterInputSearch,
    sortSelect: SortSelect,
  }: PlumeAdminThemeComponents = usePlumeTheme();

  const {
    searchObject,
    updateSearchField,
    onReset,
  }: UseSearchFilterHook<UserSearch> = useSearchFilter<UserSearch>();

  const {
    sortOptions,
    currentSort,
    updateSort,
  }: SearchSortType<UserSort> = useSearchSort(
    {
      sortOptionKeys: [UserSort.USER_NAME, UserSort.CREATION_DATE],
      defaultSortOption: {
        id: UserSort.CREATION_DATE,
        desc: true,
      },
    },
  );

  const {
    elements,
    totalElements,
    displayMore,
    hasMore,
  }: SearchDataHookType<AdminUserDetails> = useSearchLoadedData<AdminUserDetails, UserSearch, UserSort>(
    usersWithRoles?.users ?? [],
    {
      filters: {
        object: searchObject,
        apply: (user: AdminUserDetails, filter: Partial<UserSearch>) => (
          filterFunctions.includesString(user.userName, filter.userName ?? '')
          && filterLastLoginDateFromOption(user, filter.lastLoginDate)
          && filterFunctions.nonEmptyArrIncludes(user.idRole, filter.roles ?? [])
        ),
      },
      sort: {
        object: currentSort,
        apply: {
          [UserSort.USER_NAME]: (
            value: AdminUserDetails,
            compared: AdminUserDetails,
            isDesc: boolean,
          ) => sortFunctions.withSortDirection<string>(sortFunctions.text, isDesc)(value.userName, compared.userName),
          [UserSort.CREATION_DATE]: (
            value: AdminUserDetails,
            compared: AdminUserDetails,
            isDesc: boolean,
          ) => sortFunctions.withSortDirection<Dayjs>(sortFunctions.datetime, isDesc)(
            dayjs(value.creationDate),
            dayjs(compared.creationDate),
          ),
        },
      },
    },
  );

  return (
    <Panel>
      <PanelTitle>
        {messages.user.title_list}
      </PanelTitle>
      <PanelContent>
        <PanelContentElement columns={6}>
          <PanelContentElementColumn width={3}>
            <FilterInputSearch
              value={searchObject.userName ?? ''}
              onChange={(value: string) => updateSearchField('userName', value)}
              onClear={() => updateSearchField('userName', '')}
            />
          </PanelContentElementColumn>
          <PanelContentElementColumn width={3}>
            <ActionContainer position="end">
              <ActionLink
                icon="add"
                linkTo={CREATE}
                style={ActionStyle.PRIMARY}
              >
                {messages.user.add_user}
              </ActionLink>
            </ActionContainer>
          </PanelContentElementColumn>
        </PanelContentElement>
        <PanelContentElement columns={5}>
          <PanelContentElementColumn width={1}>
            <FilterMenu title={messages.filters.title} onResetFilters={onReset}>
              <FilterGroup
                messageKey="user_last_login"
                type="single"
                onChange={(values: string[]) => updateSearchField('lastLoginDate', values[0])}
                possibleValues={[
                  {
                    label: messages.filters.user_last_login.options[CreationDateOption.LESS_THAN_15_DAYS],
                    value: CreationDateOption.LESS_THAN_15_DAYS,
                  },
                  {
                    label: messages.filters.user_last_login.options[CreationDateOption.BETWEEN_15_45_DAYS],
                    value: CreationDateOption.BETWEEN_15_45_DAYS,
                  },
                  {
                    label: messages.filters.user_last_login.options[CreationDateOption.MORE_THAN_45_DAYS],
                    value: CreationDateOption.MORE_THAN_45_DAYS,
                  },
                ]}
                selectedValues={searchObject.lastLoginDate ? [searchObject.lastLoginDate] : []}
              />
              <FilterGroup
                messageKey="user_role"
                type="multiple"
                onChange={(values: string[]) => updateSearchField('roles', values)}
                possibleValues={
                  Array.from(usersWithRoles?.roles.entries() ?? [])
                    .map(([value, label]: [string, string]) => ({
                      label,
                      value,
                    })) ?? []
                }
                selectedValues={searchObject.roles}
              />
            </FilterMenu>
          </PanelContentElementColumn>
          <PanelContentElementColumn width={4}>
            <ListHead title={messages.user.found(totalElements)}>
              <SortSelect<UserSort>
                messageKey="user"
                sortPossibilities={sortOptions}
                sort={currentSort}
                onSort={updateSort}
              />
            </ListHead>
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
                  {
                    elements.map((user: AdminUserDetails) => (
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
                            {dayjs(user.creationDate)
                              .format('L LT')}
                          </Link>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            )}
            {!usersWithRoles && <span>{messages.label.loading}</span>}
            {hasMore && (
              <ActionContainer>
                <ActionButton onClick={displayMore} variant="outlined">
                  {messages.action.display_more}
                </ActionButton>
              </ActionContainer>
            )}
          </PanelContentElementColumn>
        </PanelContentElement>
      </PanelContent>
    </Panel>
  );
}
