import usePlumeTheme, { PlumeAdminThemeComponents } from '@components/hooks/ThemeHook';
import {
  SearchActions,
  SearchDisplay,
  SearchDisplayFilters,
  SearchHead,
  SearchInput,
  SearchLayout,
  SearchResults,
  SearchResultsActions,
  SearchResultsHead,
  SearchResultsList,
} from '@components/layout/search/SearchLayout';
import { ActionButton } from '@components/theme/action/Actions';
import useMessages, { Messages } from '@i18n/hooks/messagesHook';
import ActionStyle from '@lib/plume-admin-theme/action/ActionStyle';
import {
  AdminUserDetails, CreationDateOption, UserSearch, UserSort,
} from '@lib/plume-admin-users/api/AdminUserTypes';
import UserTile from '@lib/plume-admin-users/components/UserTile';
import { isUserDisplayed, sortUser } from '@lib/plume-admin-users/pages/UsersSearch';
import { CREATE } from '@lib/plume-admin-users/router/UserRoutes';
import useSearchFilters, { SearchFilters } from '@lib/plume-search/filters/SearchFilterHook';
import useInMemoryPaginatedSearch from '@lib/plume-search/InMemoryPaginatedSearchHook';
import { PaginatedSearch } from '@lib/plume-search/SearchTypes';
import useSearchSort from '@lib/plume-search/sorts/SearchSortHook';
import { SearchSortType } from '@lib/plume-search/sorts/SortTypes';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { AdminUsersWithIndexedRolesType } from './AdminUsersWithIndexedRolesType';

type Props = {
  usersWithRoles?: AdminUsersWithIndexedRolesType,
  isLoading: boolean,
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
    listItem: ListItem,
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
    sort,
    onSort,
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
        isElementDisplayed: isUserDisplayed,
      },
      sort: {
        value: sort,
        sortElement: sortUser,
      },
    },
  );

  return (
    <Panel>
      <PanelTitle>
        {messages.user.title_list}
      </PanelTitle>
      <SearchLayout>
        <SearchHead>
          <SearchInput>
            <FilterInputSearch
              value={filterValues.text ?? ''}
              onChange={(value: string) => setFilterValue('text', value)}
              onClear={() => setFilterValue('text', '')}
            />
          </SearchInput>
          <SearchActions>
            <ActionLink
              icon="add"
              linkTo={CREATE}
              style={ActionStyle.PRIMARY}
            >
              {messages.user.add_user}
            </ActionLink>
          </SearchActions>
        </SearchHead>
        <SearchDisplay>
          <SearchDisplayFilters>
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
          </SearchDisplayFilters>
          <SearchResults>
            <SearchResultsHead title={messages.user.found(totalCount)} isLoading={isLoading}>
              <SortSelect<UserSort>
                messageKey="user"
                sortOptions={sortOptions}
                sort={sort}
                onSort={onSort}
              />
            </SearchResultsHead>
            <SearchResultsList
              isEmpty={!usersWithRoles?.users.length}
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
            </SearchResultsList>
            {
              hasMore
              && (
                <SearchResultsActions>
                  <ActionButton onClick={onDisplayMore} variant="outlined">
                    {messages.action.display_more}
                  </ActionButton>
                </SearchResultsActions>
              )
            }
          </SearchResults>
        </SearchDisplay>
      </SearchLayout>
    </Panel>
  );
}
