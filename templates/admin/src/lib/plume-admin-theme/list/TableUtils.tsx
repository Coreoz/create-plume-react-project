import { Checkbox } from '@mui/material';
import { Row, Table } from '@tanstack/react-table';
import React from 'react';

const rowSelectionColumn = {
  id: 'select',
  header: ({ table }: { table: Table<any> }) => (
    <Checkbox
      {...{
        checked: table.getIsAllRowsSelected(),
        indeterminate: table.getIsSomeRowsSelected(),
        onClick: table.getToggleAllRowsSelectedHandler(),
      }}
    />
  ),
  cell: ({ row }: { row: Row<any> }) => (
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

export default rowSelectionColumn;
