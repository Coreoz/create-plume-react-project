import {
  ColumnDef,
  ColumnSort,
  FilterFnOption,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  Table,
  useReactTable,
} from '@tanstack/react-table';
import { filterRawContains } from './filter/SearchFilters';
import useTableActions, { TableActionsHook } from './TableActionsHook';
import useTableOptions from './TableOptionsHook';

type TableConfiguration<T> = {
  messageKey: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[],
  data: T[],
  options?: {
    globalFilterFn?: FilterFnOption<T>,
    defaultSort?: ColumnSort,
  },
};

export type PlumeTable<T> = {
  table: Table<T>,
  tableActions: TableActionsHook,
};

function usePlumeTable<T extends { id: string }>(
  tableConfiguration: TableConfiguration<T>,
): PlumeTable<T> {
  const [tableOptionsState, tableOptions] = useTableOptions();

  const table: Table<T> = useReactTable<T>(
    {
      columns: tableConfiguration.columns,
      data: tableConfiguration.data,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFacetedUniqueValues: getFacetedUniqueValues(),
      getFilteredRowModel: getFilteredRowModel(),
      getRowId: (row: T) => row.id,
      globalFilterFn: tableConfiguration.options?.globalFilterFn ?? filterRawContains,
      state: {
        ...tableOptionsState,
      },
      ...tableOptions,
    },
  );

  const tableActions: TableActionsHook = useTableActions<T>({
    messageKey: tableConfiguration.messageKey,
    tableHeaderGroups: table.getHeaderGroups(),
    tableOptions,
    tableOptionsState,
    options: {
      defaultSort: tableConfiguration.options?.defaultSort,
    },
  });

  return {
    table,
    tableActions,
  };
}

export default usePlumeTable;
