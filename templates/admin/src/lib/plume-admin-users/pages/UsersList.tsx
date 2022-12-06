import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Checkbox } from '@mui/material';
import {
  ColumnFiltersState,
  createColumnHelper,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import dayjs from 'dayjs';
import ActionStyle from '../../plume-admin-theme/action/ActionStyle';
import PlumeAdminTheme from '../../plume-admin-theme/PlumeAdminTheme';
import { AdminUserDetails } from '../api/AdminUserTypes';
import { AdminUsersWithIndexedRolesType } from './AdminUsersWithIndexedRolesType';
import PlumeMessageResolverService from '../../plume-messages/MessageResolverService';
import filtersInclude from '../../../components/theme/utils/FilterUtils';
import useMessagesResolver from '../../plume-messages/messagesResolveHook';
import UsersListResults from '../components/UsersListResults';

type Props = {
  usersWithRoles?: AdminUsersWithIndexedRolesType;
  usersPath: string,
  isUsersLoading: boolean,
};

export default class UsersList {
  constructor(private readonly theme: PlumeAdminTheme, private readonly messageService: PlumeMessageResolverService) {
  }

  render = ({ usersWithRoles, usersPath }: Props) => {
    const messages = useMessagesResolver(this.messageService);
    const { theme } = this;
    const navigate = useNavigate();

    const [globalFilter, setGlobalFilter] = useState<string>('');
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [rowSelection, setRowSelection] = React.useState<{ [p: string]: boolean }>({});

    const columnHelper = createColumnHelper<AdminUserDetails>();

    const columns = useMemo(() => [
      {
        id: 'select',
        header: ({ table }) => (
                  <Checkbox
                      {...{
                        checked: table.getIsAllRowsSelected(),
                        indeterminate: table.getIsSomeRowsSelected(),
                        onClick: table.getToggleAllRowsSelectedHandler(),
                      }}
                  />
        ),
        cell: ({ row }) => (
                  <Checkbox
                      {...{
                        checked: row.getIsSelected(),
                        indeterminate: row.getIsSomeSelected(),
                        onClick: row.getToggleSelectedHandler(),
                      }}
                  />
        ),
        enableSorting: false,
      },
      columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
        id: 'fullName',
        filterFn: filtersInclude,
        cell: (info) => info.renderValue(),
      }),
      columnHelper.accessor('userName', {
        enableSorting: false,
        filterFn: filtersInclude,
        cell: (info) => info.renderValue(),
      }),
      columnHelper.accessor('email', {
        enableSorting: false,
        filterFn: filtersInclude,
        cell: (info) => info.renderValue(),
      }),
      columnHelper.accessor((row) => usersWithRoles?.roles?.get(row.idRole), {
        id: 'role',
        enableSorting: false,
        filterFn: filtersInclude,
        cell: (info) => info.renderValue(),
      }),
      columnHelper.accessor('creationDate', {
        filterFn: filtersInclude,
        cell: (info) => dayjs(info.getValue()).format('L LT'),
      }),
    ], [usersWithRoles?.roles]);

    const table = useReactTable({
      data: usersWithRoles?.users || [],
      columns,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getRowId: (row) => row.id,
      enableSorting: true,
      enableSortingRemoval: true,
      state: {
        sorting,
        rowSelection,
        columnFilters,
        globalFilter,
      },
      initialState: {
        pagination: {
          pageSize: 20,
        },
      },
      getFacetedUniqueValues: getFacetedUniqueValues(),
      onColumnFiltersChange: setColumnFilters,
      onGlobalFilterChange: setGlobalFilter,
      onRowSelectionChange: setRowSelection,
      onSortingChange: setSorting,
      debugTable: true,
    });

    return (
        <>
            <theme.pageTitle>{messages.t('user.title_list')}</theme.pageTitle>
            <theme.pageBloc>
                <theme.pageBlocColumn columnWidth="50">
                    <theme.searchBar
                        onSearch={(event: React.ChangeEvent<HTMLInputElement>) => {
                          setGlobalFilter(event.target.value);
                        }}
                    />
                </theme.pageBlocColumn>
                <theme.pageBlocColumn columnWidth="50">
                    <theme.actionsContainer>
                        <theme.actionButton
                            icon="add"
                            style={ActionStyle.PRIMARY}
                            onClick={() => {
                              navigate({ pathname: `${usersPath}/create` });
                            }}
                        >
                            {messages.t('user.add')}
                        </theme.actionButton>
                    </theme.actionsContainer>
                </theme.pageBlocColumn>
            </theme.pageBloc>
            <theme.pageBloc>
                <theme.pageBlocColumn columnWidth="20">
                    <theme.multipleChoiceObjectFilterMenu
                        filterObjectKey="user"
                        table={table}
                        columnFilters={columnFilters}
                    />
                </theme.pageBlocColumn>
                <theme.pageBlocColumn columnWidth="80">
                    <theme.tableResults
                        rowSelection={rowSelection}
                        table={table}
                        usersPath={usersPath}
                    />
                </theme.pageBlocColumn>
            </theme.pageBloc>
        </>
    );
  };
}
