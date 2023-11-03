import { ColumnFiltersState, OnChangeFn, SortingState } from '@tanstack/react-table';
import React, { useState } from 'react';
import { RowSelection } from '../../../lib/plume-admin-theme/table/TableProps';

export type DefaultTableOptions = {
  onColumnFiltersChange: OnChangeFn<ColumnFiltersState>,
  onGlobalFilterChange: OnChangeFn<string>
  onRowSelectionChange: OnChangeFn<RowSelection>
  onSortingChange: OnChangeFn<SortingState>
};

export type TableOptionsValue = {
  globalFilter: string,
  columnFilters: ColumnFiltersState,
  sorting: SortingState,
  rowSelection: RowSelection
};

export default function useTableOptions(
  defaultSorting: SortingState,
) : [TableOptionsValue, DefaultTableOptions] {
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>(defaultSorting ?? []);
  const [rowSelection, setRowSelection] = React.useState<RowSelection>({});

  const tableOptions = {
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
  };

  const tableOptionsCurrentValue = {
    globalFilter,
    columnFilters,
    sorting,
    rowSelection,
  };

  return [tableOptionsCurrentValue, tableOptions];
}
