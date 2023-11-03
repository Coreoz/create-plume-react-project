import {
  ColumnHelper,
  createColumnHelper,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  Table,
  useReactTable,
} from '@tanstack/react-table';
import dayjs from 'dayjs';
import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import {
  filterListContains,
  filterRawContains,
} from '../../../components/theme/table/filter/SearchFilters';
import useTableFilter
  from '../../../components/theme/table/filter/TableFilterHook';
import useTableSorting
  from '../../../components/theme/table/sort/TableSortHook';
import useTableOptions from '../../../components/theme/table/TableOptionsHook';
import useMessages from '../../../i18n/hooks/messagesHook';
import ActionStyle from '../../plume-admin-theme/action/ActionStyle';
import PlumeAdminTheme from '../../plume-admin-theme/PlumeAdminTheme';
import { AdminUserDetails } from '../api/AdminUserTypes';
import UsersListResults from '../components/UsersListResults';
import {
  AdminUsersWithIndexedRolesType,
} from './AdminUsersWithIndexedRolesType';

type Props = {
  usersWithRoles?: AdminUsersWithIndexedRolesType,
  usersPath: string,
  isUsersLoading: boolean,
};

export default function UsersList({
  usersWithRoles,
  usersPath,
  isUsersLoading,
}: Props) {
  const { messages } = useMessages();
  const theme: PlumeAdminTheme = getGlobalInstance(PlumeAdminTheme);
  const navigate: NavigateFunction = useNavigate();

  const [tableOptionsState, tableOptions] = useTableOptions(
    [{ id: 'firstName', desc: false }],
  );
  const columnHelper: ColumnHelper<AdminUserDetails> = createColumnHelper<AdminUserDetails>();
  const table: Table<AdminUserDetails> = useReactTable<AdminUserDetails>(
    {
      columns: [
        columnHelper.accessor(
          (row: AdminUserDetails) => `${row.firstName.slice(0, 1).toUpperCase()}${row.lastName.slice(0, 1).toUpperCase()}`,
          {
            id: 'initials',
            enableColumnFilter: false,
            enableSorting: false,
          },
        ),
        columnHelper.accessor(
          (row: AdminUserDetails) => usersWithRoles?.roles.get(row.idRole),
          {
            id: 'role',
            filterFn: filterListContains,
          },
        ),
        columnHelper.accessor(
          (row: AdminUserDetails) => row.firstName,
          {
            id: 'firstName',
            sortingFn: 'textCaseSensitive',
            enableColumnFilter: false,
          },
        ),
        columnHelper.accessor(
          (row: AdminUserDetails) => row.lastName,
          {
            id: 'lastName',
            sortingFn: 'textCaseSensitive',
            filterFn: filterListContains,
          },
        ),
        columnHelper.accessor(
          (row: AdminUserDetails) => row.email,
          {
            id: 'email',
            enableColumnFilter: false,
          },
        ),
        columnHelper.accessor(
          (row: AdminUserDetails) => dayjs(row.creationDate).format('L LT'),
          {
            id: 'creationDate',
            sortingFn: 'datetime',
            enableColumnFilter: false,
          },
        ),
      ],
      data: usersWithRoles?.users ?? [],
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFacetedUniqueValues: getFacetedUniqueValues(),
      getFilteredRowModel: getFilteredRowModel(),
      getRowId: (row: AdminUserDetails) => row.id,
      globalFilterFn: filterRawContains,
      state: {
        ...tableOptionsState,
      },
      ...tableOptions,
    },
  );

  const sortConfiguration = useTableSorting<AdminUserDetails>(
    'user',
    table.getHeaderGroups(),
    tableOptionsState.sorting[0],
    tableOptions.onSortingChange,
  );

  const filterConfiguration = useTableFilter<AdminUserDetails>(
    'user',
    table.getHeaderGroups(),
    tableOptionsState.columnFilters,
    tableOptions.onColumnFiltersChange,
  );

  return (
    <>
      <theme.pageTitle>{messages.user.title_list}</theme.pageTitle>
      <theme.pageBloc>
        <theme.pageBlocColumn columnWidth="50">
          <theme.searchBar
            onSearch={(event: React.ChangeEvent<HTMLInputElement>) => {
              tableOptions.onGlobalFilterChange(event.target.value);
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
          <theme.multipleChoiceFilterMenu
            filterMenuKey={filterConfiguration.filterMenuKey}
            filters={filterConfiguration.filters}
            onFilterValueClicked={filterConfiguration.onFilterValueClicked}
            selectedValues={filterConfiguration.selectedValues}
          />
        </theme.pageBlocColumn>
        <theme.pageBlocColumn columnWidth="80">
          <UsersListResults
            userList={table.getRowModel().rows}
            usersPath={usersPath}
            sortConfiguration={sortConfiguration}
            isLoading={isUsersLoading}
          />
        </theme.pageBlocColumn>
      </theme.pageBloc>
    </>
  );
}
