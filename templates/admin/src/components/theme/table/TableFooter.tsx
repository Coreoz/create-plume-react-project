import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { IconButton, TextField } from '@mui/material';
import React from 'react';
import { TableProps } from '../../../lib/plume-admin-theme/list/TableProps';

function TableFooter<T>(
  {
    table,
  }: TableProps<T>,
) {
  return (
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
  );
}

export default (TableFooter);
