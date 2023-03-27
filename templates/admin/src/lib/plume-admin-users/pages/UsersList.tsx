import {
  createColumnHelper,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useDefaultTableOptions from '../../../components/theme/list/useDefaultTableOptions';
import filtersInclude from '../../../components/theme/utils/FilterUtils';
import ActionStyle from '../../plume-admin-theme/action/ActionStyle';
import rowSelectionColumn from '../../plume-admin-theme/list/TableUtils';
import PlumeAdminTheme from '../../plume-admin-theme/PlumeAdminTheme';
import PlumeMessageResolverService from '../../plume-messages/MessageResolverService';
import useMessagesResolver from '../../plume-messages/messagesResolveHook';
import { AdminUserDetails } from '../api/AdminUserTypes';
import { AdminUsersWithIndexedRolesType } from './AdminUsersWithIndexedRolesType';

type Props = {
  usersWithRoles?: AdminUsersWithIndexedRolesType;
  usersPath: string,
};

export default class UsersList {
  constructor(private readonly theme: PlumeAdminTheme, private readonly messageService: PlumeMessageResolverService) {
  }

  render = ({ usersWithRoles, usersPath }: Props) => {
    const messages = useMessagesResolver(this.messageService);
    const { theme } = this;
    const navigate = useNavigate();

    const [tableOptionsValue, tableOptions] = useDefaultTableOptions();

    const columnHelper = createColumnHelper<AdminUserDetails>();

    const columns = useMemo(() => [
      rowSelectionColumn,
      columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
        id: 'fullName',
        filterFn: filtersInclude,
        cell: (cellData) => cellData.renderValue(),
      }),
      columnHelper.accessor('userName', {
        enableSorting: false,
        filterFn: filtersInclude,
        cell: (cellData) => cellData.renderValue(),
      }),
      columnHelper.accessor('email', {
        enableSorting: false,
        filterFn: filtersInclude,
        cell: (cellData) => cellData.renderValue(),
      }),
      columnHelper.accessor((row) => usersWithRoles?.roles?.get(row.idRole), {
        id: 'role',
        enableSorting: false,
        filterFn: filtersInclude,
        cell: (cellData) => cellData.renderValue(),
      }),
      columnHelper.accessor('creationDate', {
        filterFn: filtersInclude,
        cell: (cellData) => dayjs(cellData.getValue()).format('L LT'),
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
        ...tableOptionsValue,
      },
      initialState: {
        pagination: {
          pageSize: 20,
        },
      },
      getFacetedUniqueValues: getFacetedUniqueValues(),
      ...tableOptions,
    });

    const showUpdateUserPopin = () => {
      navigate({ pathname: `${usersPath}/${Object.keys(tableOptionsValue.rowSelection)[0]}` });
    };

    return (
        <>
            <theme.pageTitle>{messages.t('user.title_list')}</theme.pageTitle>
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
                        columnFilters={tableOptionsValue.columnFilters}
                    />
                </theme.pageBlocColumn>
                <theme.pageBlocColumn columnWidth="80">
                    <theme.tableResults
                        rowSelection={tableOptionsValue.rowSelection}
                        updateItem={showUpdateUserPopin}
                        // Todo
                        deleteItem={() => {}}
                        table={table}
                    />
                </theme.pageBlocColumn>
            </theme.pageBloc>
        </>
    );
  };
}
