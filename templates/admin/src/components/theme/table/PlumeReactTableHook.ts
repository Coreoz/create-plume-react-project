import {
  ColumnDef,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  Table,
  useReactTable,
} from '@tanstack/react-table';
import { filterRawContains } from './filter/SearchFilters';
import useTableOptions from './TableOptionsHook';

function usePlumeReactTable<T extends { id: string }>(
  columns: ColumnDef<T, string | number>[],
  data?: T[],
) {
  const [tableOptionsState, tableOptions] = useTableOptions(
    [{ id: 'firstName', desc: false }],
  );
  const table: Table<T> = useReactTable<T>(
    {
      columns: columns,
      data: data ?? [],
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFacetedUniqueValues: getFacetedUniqueValues(),
      getFilteredRowModel: getFilteredRowModel(),
      getRowId: (row: T) => row.id,
      globalFilterFn: filterRawContains,
      state: {
        ...tableOptionsState,
      },
      ...tableOptions,
    },
  );

  return {
    table
  }
}
