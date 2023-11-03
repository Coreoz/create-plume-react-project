import { Table } from '@tanstack/react-table';

export type RowSelection = {
  [rowId: string]: boolean,
};

export type TableProps<T> = {
  table: Table<T>
};
