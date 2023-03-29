import { Checkbox } from '@mui/material';
import { ColumnDef, Row, Table } from '@tanstack/react-table';
import React from 'react';

const rowSelectionColumnUntyped = {
  id: 'select',
  header: ({ table }: { table: Table<unknown> }) => (
    <Checkbox
      {...{
        checked: table.getIsAllRowsSelected(),
        indeterminate: table.getIsSomeRowsSelected(),
        onClick: table.getToggleAllRowsSelectedHandler(),
      }}
    />
  ),
  cell: ({ row }: { row: Row<unknown> }) => (
    <Checkbox
      {...{
        checked: row.getIsSelected(),
        indeterminate: row.getIsSomeSelected(),
        onClick: row.getToggleSelectedHandler(),
      }}
    />
  ),
  enableSorting: false,
};

function RowSelectionColumn<T>(): ColumnDef<T, unknown> {
  return rowSelectionColumnUntyped as ColumnDef<T, unknown>;
}

export default RowSelectionColumn;
