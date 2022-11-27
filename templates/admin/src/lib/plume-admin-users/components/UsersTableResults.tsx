import { getGlobalInstance } from 'plume-ts-di';
import React, { useMemo } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import {
  Checkbox, IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel, TextField,
  Toolbar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { ActionButton, ActionsContainer } from '../../../components/theme/action/Actions';
import useMessages from '../../../i18n/hooks/messagesHook';
import { AdminUserDetails } from '../api/AdminUserTypes';
import PlumeAdminTheme from '../../plume-admin-theme/PlumeAdminTheme';
import { SortMenuProps } from '../../plume-admin-theme/list/sort/SortProps';

type Props = {
  userList: AdminUserDetails[],
  userRoles: Map<string, string> | undefined,
  sortConfiguration: SortMenuProps,
  usersPath: string
};

function UsersTableResults(
  {
    userList, userRoles, sortConfiguration, usersPath,
  }: Props,
) {
  const { messages } = useMessages();
  const theme = getGlobalInstance(PlumeAdminTheme);
  const navigate = useNavigate();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState({});

  const columnHelper = createColumnHelper<AdminUserDetails>();

  const updateUser = () => {
    navigate({ pathname: `${usersPath}/${Object.keys(rowSelection)[0]}` });
  };

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
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('userName', {
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('email', {
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor('idRole', {
      cell: (info) => userRoles?.get(info.getValue()),
    }),
  ], [userRoles]);

  const table = useReactTable({
    data: userList,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId: (row) => row.id,
    enableSorting: true,
    enableSortingRemoval: true,
    state: {
      sorting,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 1,
      },
    },
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
  });

  return (
        <div className="table_root">
            <theme.listHeader
                listTitle={messages.user.list.count(userList.length)}
                sortConfiguration={sortConfiguration}
            />
          {Object.values(rowSelection).length > 0
          && <Toolbar>
            <div>
              {`${Object.values(rowSelection).length} ${messages.selected(Object.values(rowSelection).length)}`}
            </div>
            <ActionsContainer>
              {Object.values(rowSelection).length === 1 && <ActionButton variant="text" onClick={updateUser}>
                {messages.action.update}
              </ActionButton>}
              <ActionButton variant="text">
                {messages.action.delete}
              </ActionButton>
            </ActionsContainer>
          </Toolbar>
          }
          <Table>
            <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                      <TableCell key={header.id}
                                 sortDirection={header.column.getIsSorted()}
                                 onClick={header.column.getToggleSortingHandler()}>
                        {header.column.getCanSort() ? <TableSortLabel
                            active={!!header.column.getIsSorted()}
                            direction={header.column.getIsSorted() || undefined}
                            onClick={header.column.getToggleSortingHandler()}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        </TableSortLabel> : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </TableCell>
                  ))}
                </TableRow>
            ))}
            </TableHead>
            <TableBody>
            {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                  ))}
                </TableRow>
            ))}
            </TableBody>
          </Table>
          <div className="table_pagination">
            <IconButton
                color="primary"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
            >
              <KeyboardDoubleArrowLeftIcon />
            </IconButton>
            <IconButton
                color="primary"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
            >
              <KeyboardArrowLeftIcon />
            </IconButton>
            <>
            <TextField
                type="number"
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                disabled={table.getPageCount() === 1}
                variant="outlined"
                value={table.getState().pagination.pageIndex + 1}
            />
              {`\u00A0/ ${table.getPageCount()}`}
            </>
            <IconButton
                color="primary"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
            >
              <KeyboardArrowRightIcon />
            </IconButton>
            <IconButton
                color="primary"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
            >
              <KeyboardDoubleArrowRightIcon />
            </IconButton>
          </div>
        </div>
  );
}

export default (UsersTableResults);
