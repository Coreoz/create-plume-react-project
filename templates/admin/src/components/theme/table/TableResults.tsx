import {
  Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel,
} from '@mui/material';
import { flexRender } from '@tanstack/react-table';
import React from 'react';
import { TableProps } from '../../../lib/plume-admin-theme/list/TableProps';

function TableResults<T>(
  {
    table,
  }: TableProps<T>,
) {
  return (
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
  );
}

export default (TableResults);
