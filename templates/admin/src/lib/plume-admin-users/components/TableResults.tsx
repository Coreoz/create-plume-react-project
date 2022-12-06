import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import { flexRender } from '@tanstack/react-table';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Toolbar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { ActionButton, ActionsContainer } from '../../../components/theme/action/Actions';
import useMessages from '../../../i18n/hooks/messagesHook';
import PlumeAdminTheme from '../../plume-admin-theme/PlumeAdminTheme';
import { TableProps } from '../../plume-admin-theme/list/TableProps';

function TableResults<T>(
  {
    rowSelection, usersPath, table,
  }: TableProps<T>,
) {
  const { messages } = useMessages();
  const theme = getGlobalInstance(PlumeAdminTheme);
  const navigate = useNavigate();

  const updateUser = () => {
    navigate({ pathname: `${usersPath}/${Object.keys(rowSelection)[0]}` });
  };
  return (
        <div className="table_root">
            <theme.listHeader
                listTitle={messages.user.list.count(table.getPrePaginationRowModel().rows.length)}
                tableSorting={{
                  sortedObjectKey: 'user',
                  defaultSortKey: 'fullName_desc',
                  table,
                }}
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

export default (TableResults);
