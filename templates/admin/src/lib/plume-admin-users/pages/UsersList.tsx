import usePlumeTheme, { PlumeAdminThemeComponents } from '@components/hooks/ThemeHook';
import { ActionButton } from '@components/theme/action/Actions';
import useMessages, { Messages } from '@i18n/hooks/messagesHook';
import ActionStyle from '@lib/plume-admin-theme/action/ActionStyle';

import scss from '@components/layout/search-layout.module.scss';
import UserTile from '@lib/plume-admin-users/components/UserTile';
import { CREATE } from '@lib/plume-admin-users/router/UserRoutes';
import filterFunctions from '@lib/plume-search/filters/FilterFunctions';
import useSearchFilters, { SearchFilters } from '@lib/plume-search/filters/SearchFilterHook';
import useInMemoryPaginatedSearch from '@lib/plume-search/InMemoryPaginatedSearchHook';
import { PaginatedSearch } from '@lib/plume-search/SearchTypes';
import useSearchSort from '@lib/plume-search/sorts/SearchSortHook';
import sortFunctions from '@lib/plume-search/sorts/SortFunctions';
import { SearchSortType, SortOption } from '@lib/plume-search/sorts/SortTypes';
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
  text: string,
  creationDate: CreationDateOption,
  roles: string[],
};

enum UserSort {
  USER_NAME = 'USER_NAME',
  CREATION_DATE = 'CREATION_DATE',
}

const filterLastLoginDateFromOption = (value: AdminUserDetails, option: CreationDateOption | undefined) => {
  const daysDifferenceBetweenCreationAndToday: number = dayjs()
    .diff(dayjs(value.creationDate), 'day');
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
    filterValues,
    setFilterValue,
    resetFilters,
  }: SearchFilters<UserSearch> = useSearchFilters<UserSearch>();

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
    displayedItems,
    totalCount,
    onDisplayMore,
    hasMore,
  }: PaginatedSearch<AdminUserDetails> = useInMemoryPaginatedSearch<AdminUserDetails, UserSearch, UserSort>(
    usersWithRoles?.users ?? [],
    {
      filter: {
        values: filterValues,
        isElementDisplayed: (user: AdminUserDetails, filter: Partial<UserSearch>) => (
          (
            filterFunctions.includesStringInsensitive(user.userName, filter.text ?? '')
            || filterFunctions.includesStringInsensitive(user.firstName, filter.text ?? '')
            || filterFunctions.includesStringInsensitive(user.lastName, filter.text ?? '')
            || filterFunctions.includesStringInsensitive(user.email, filter.text ?? '')
          )
          && filterLastLoginDateFromOption(user, filter.creationDate)
          && filterFunctions.nonEmptyArrayIncludes(user.idRole, filter.roles ?? [])
        ),
      },
      sort: {
        value: currentSort,
        sortElement: (value: AdminUserDetails, compared: AdminUserDetails, sortOption: SortOption<UserSort>) => {
          if (sortOption.id === UserSort.USER_NAME) {
            return sortFunctions.withSortDirection<string>(sortFunctions.text, sortOption.desc)(
              value.userName,
              compared.userName,
            );
          }
          if (sortOption.id === UserSort.CREATION_DATE) {
            return sortFunctions.withSortDirection<Dayjs>(sortFunctions.datetime, sortOption.desc)(
              dayjs(value.creationDate),
              dayjs(compared.creationDate),
            );
          }
          return 0;
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
              value={filterValues.text ?? ''}
              onChange={(value: string) => setFilterValue('text', value)}
              onClear={() => setFilterValue('text', '')}
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
            <FilterMenu title={messages.filters.title} onResetFilters={resetFilters}>
              <FilterGroup
                messageKey="user_creation_date"
                type="single"
                onChange={(values: string[]) => setFilterValue('creationDate', values[0])}
                possibleValues={[
                  {
                    label: messages.filters.user_creation_date.options[CreationDateOption.LESS_THAN_15_DAYS],
                    value: CreationDateOption.LESS_THAN_15_DAYS,
                  },
                  {
                    label: messages.filters.user_creation_date.options[CreationDateOption.BETWEEN_15_45_DAYS],
                    value: CreationDateOption.BETWEEN_15_45_DAYS,
                  },
                  {
                    label: messages.filters.user_creation_date.options[CreationDateOption.MORE_THAN_45_DAYS],
                    value: CreationDateOption.MORE_THAN_45_DAYS,
                  },
                ]}
                selectedValues={filterValues.creationDate ? [filterValues.creationDate] : []}
              />
              <FilterGroup
                messageKey="user_role"
                type="multiple"
                onChange={(values: string[]) => setFilterValue('roles', values)}
                possibleValues={
                  Array.from(usersWithRoles?.roles.entries() ?? [])
                    .map(([value, label]: [string, string]) => ({
                      label,
                      value,
                    })) ?? []
                }
                selectedValues={filterValues.roles}
              />
            </FilterMenu>
          </div>
          <div className={scss.searchResults}>
            <ListHead title={messages.user.found(totalCount)} className={scss.searchResultsHead}>
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
                displayedItems.map((user: AdminUserDetails) => (
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
                  <ActionButton onClick={onDisplayMore} variant="outlined">
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
