import { getGlobalInstance } from 'plume-ts-di';
import React, { useMemo } from 'react';
import {
  createColumnHelper, flexRender, getCoreRowModel, useReactTable,
} from '@tanstack/react-table';
import { SortMenuProps } from '../../plume-admin-theme/list/sort/SortProps';
import PlumeAdminTheme from '../../plume-admin-theme/PlumeAdminTheme';
import { AdminUserDetails } from '../api/AdminUserTypes';
import useMessages from '../../../i18n/hooks/messagesHook';

type Props = {
  userList: AdminUserDetails[],
  userRoles: Map<string, string> | undefined,
  sortConfiguration: SortMenuProps,
};

function UsersTableResults(
  {
    userList, userRoles, sortConfiguration,
  }: Props,
) {
  const { messages } = useMessages();
  const theme = getGlobalInstance(PlumeAdminTheme);

  const columnHelper = createColumnHelper<AdminUserDetails>();

  const columns = useMemo(() => [
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
  });

  return (
        <>
            <theme.listHeader
                listTitle={messages.user.list.count(userList.length)}
                sortConfiguration={sortConfiguration}
            />
          <table>
            <thead>
            {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                      <th key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                      </th>
                  ))}
                </tr>
            ))}
            </thead>
            <tbody>
            {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                  ))}
                </tr>
            ))}
            </tbody>
            <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
                <tr key={footerGroup.id}>
                  {footerGroup.headers.map((header) => (
                      <th key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.footer,
                            header.getContext(),
                          )}
                      </th>
                  ))}
                </tr>
            ))}
            </tfoot>
          </table>
        </>
  );
}

export default (UsersTableResults);
