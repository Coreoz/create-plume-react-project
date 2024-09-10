import usePlumeTheme, { PlumeAdminThemeComponents } from '@components/hooks/ThemeHook';
import { ActionButton } from '@components/theme/action/Actions';
import useMessages, { Messages } from '@i18n/hooks/messagesHook';
import ActionStyle from '@lib/plume-admin-theme/action/ActionStyle';

import scss from '@lib/plume-admin-theme/layout/search-layout.module.scss';
import UserTile from '@lib/plume-admin-users/components/UserTile';
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
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { AdminUserDetails } from '../api/AdminUserTypes';
import { AdminUsersWithIndexedRolesType } from './AdminUsersWithIndexedRolesType';

type Props = {
  usersWithRoles?: AdminUsersWithIndexedRolesType,
  isLoading: boolean,
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
  const creationDate: Dayjs = dayjs(value.creationDate);
  if (option === CreationDateOption.MORE_THAN_45_DAYS) {
    return dayjs()
      .diff(creationDate, 'day') > 45;
  }
  if (option === CreationDateOption.LESS_THAN_15_DAYS) {
    return dayjs()
      .diff(creationDate, 'day') < 15;
  }
  if (option === CreationDateOption.BETWEEN_15_45_DAYS) {
    return !(dayjs()
      .diff(creationDate, 'day') < 15 || dayjs()
      .diff(creationDate, 'day') > 45);
  }
  return true;
};

export default function UsersList(
  {
    usersWithRoles,
    isLoading,
  }: Props,
) {
  const navigate: NavigateFunction = useNavigate();
  const { messages }: Messages = useMessages();
  const {
    panel: Panel,
    panelTitle: PanelTitle,
    panelContent: PanelContent,
    listHead: ListHead,
    list: List,
    listItem: ListItem,
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
      <PanelContent className={scss.searchLayout}>
        <div className={scss.searchHead}>
          <div className={scss.searchInput}>
            <FilterInputSearch
              value={searchObject.userName ?? ''}
              onChange={(value: string) => updateSearchField('userName', value)}
              onClear={() => updateSearchField('userName', '')}
            />
          </div>
          <ActionContainer className={scss.searchActions} position="end">
            <ActionLink
              icon="add"
              linkTo={CREATE}
              style={ActionStyle.PRIMARY}
            >
              {messages.user.add_user}
            </ActionLink>
          </ActionContainer>
        </div>
        <div className={scss.searchDisplay}>
          <div className={scss.searchFilters}>
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
          </div>
          <div className={scss.searchResults}>
            <ListHead title={messages.user.found(totalElements)} className={scss.searchResultsHead}>
              <SortSelect<UserSort>
                messageKey="user"
                sortPossibilities={sortOptions}
                sort={currentSort}
                onSort={updateSort}
              />
            </ListHead>
            <List
              isEmpty={!usersWithRoles?.users.length}
              className={scss.searchResultsResults}
              isLoading={isLoading}
            >
              {
                elements.map((user: AdminUserDetails) => (
                  <ListItem
                    key={user.id}
                    onClick={() => navigate(user.id)}
                  >
                    <UserTile user={user} />
                  </ListItem>
                ))
              }
            </List>
            {
              hasMore
              && (
                <ActionContainer className={scss.searchResultsActions}>
                  <ActionButton onClick={displayMore} variant="outlined">
                    {messages.action.display_more}
                  </ActionButton>
                </ActionContainer>
              )
            }
          </div>
        </div>
      </PanelContent>
    </Panel>
  );
}
