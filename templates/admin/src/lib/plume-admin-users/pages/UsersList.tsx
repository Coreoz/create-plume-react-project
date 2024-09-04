import usePlumeTheme, { PlumeAdminThemeComponents } from '@components/hooks/ThemeHook';
import useMessages, { Messages } from '@i18n/hooks/messagesHook';
import { CREATE } from '@lib/plume-admin-users/router/UserRoutes';
import useFilteredObjects, { FilteredObjectsHookType } from '@lib/plume-search/filters/FilteredObjectsHook';
import useSearchFilter, { UseSearchFilterHook } from '@lib/plume-search/filters/SearchFilterHook';
import dayjs from 'dayjs';
import React from 'react';
import { Link } from 'react-router-dom';
import ActionStyle from '../../plume-admin-theme/action/ActionStyle';
import { AdminUserDetails } from '../api/AdminUserTypes';
import { AdminUsersWithIndexedRolesType } from './AdminUsersWithIndexedRolesType';

type Props = {
  usersWithRoles?: AdminUsersWithIndexedRolesType,
};

type UserSearch = {
  userName: string,
  email: string[],
  roles: string[],
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
    filterMenu: FilterMenu,
    filterGroup: FilterGroup,
    filterInputSearch: FilterInputSearch,
  }: PlumeAdminThemeComponents = usePlumeTheme();

  const {
    searchObject,
    updateSearchField,
    onReset,
  }: UseSearchFilterHook<UserSearch> = useSearchFilter<UserSearch>();

  const { elements }: FilteredObjectsHookType<AdminUserDetails> = useFilteredObjects<AdminUserDetails, UserSearch>(
    usersWithRoles?.users ?? [],
    searchObject,
    (filter: Partial<UserSearch>) => (user: AdminUserDetails) => (
      user.userName.includes(filter.userName ?? '')
      && (filter.email?.includes(user.email) ?? true)
      && (filter.roles?.includes(user.idRole) ?? true)
    ),
    (users: AdminUserDetails[], filter: Partial<UserSearch>) => !!filter.userName || (filter.email?.length ?? 0) > 0,
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
                messageKey="user_email"
                type="single"
                onChange={(values: string[]) => updateSearchField('email', values)}
                possibleValues={usersWithRoles?.users?.map((user: AdminUserDetails) => ({
                  label: user.email,
                  value: user.email,
                })) ?? []}
                selectedValues={searchObject.email}
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
          </PanelContentElementColumn>
        </PanelContentElement>
      </PanelContent>
    </Panel>
  );
}
