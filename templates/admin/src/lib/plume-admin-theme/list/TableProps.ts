import { Table } from '@tanstack/react-table';

export type RowSelection = {
  [rowId: string]: boolean,
};

export type TableProps<T> = {
  rowSelection: RowSelection,
  updateItem: () => void,
  deleteItem: () => void
  table: Table<T>
};
