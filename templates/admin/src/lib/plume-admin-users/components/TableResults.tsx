import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
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
import { flexRender } from '@tanstack/react-table';
import React from 'react';
import { ActionButton, ActionsContainer } from '../../../components/theme/action/Actions';
import useMessages from '../../../i18n/hooks/messagesHook';
import { TableProps } from '../../plume-admin-theme/list/TableProps';

function TableResults<T>(
  {
    rowSelection, updateItem, deleteItem, table,
  }: TableProps<T>,
) {
  const { messages } = useMessages();

  return (
        <div className="table_root">
          {Object.values(rowSelection).length > 0
          && <Toolbar>
            <div>
              {`${Object.values(rowSelection).length} ${messages.selected(Object.values(rowSelection).length)}`}
            </div>
            <ActionsContainer>
              {Object.values(rowSelection).length === 1 && <ActionButton variant="text" onClick={updateItem}>
                {messages.action.update}
              </ActionButton>}
              <ActionButton variant="text" onClick={deleteItem}>
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
