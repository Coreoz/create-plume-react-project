import { Table } from '@tanstack/react-table';

export type TableProps<T> = {
  rowSelection: { [p: string]: boolean },
  usersPath: string
  table: Table<T>
};
