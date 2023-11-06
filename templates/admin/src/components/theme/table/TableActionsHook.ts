import { ColumnSort, HeaderGroup, OnChangeFn } from '@tanstack/react-table';
import {
  FilterMenuProps,
} from '../../../lib/plume-admin-theme/table/filter/FilterProps';
import {
  SortMenuProps,
} from '../../../lib/plume-admin-theme/table/sort/SortProps';
import { RowSelection } from '../../../lib/plume-admin-theme/table/TableProps';
import useTableFilter from './filter/TableFilterHook';
import useTableSorting from './sort/TableSortHook';
import { DefaultTableOptions, TableOptionsValue } from './TableOptionsHook';

export type TableActionsHook = {
  onGlobalFilterChange: OnChangeFn<string>,
  onRowSelectionChange: OnChangeFn<RowSelection>,
  sortConfiguration: SortMenuProps
  filterConfiguration: FilterMenuProps,
};

type ActionOptions = {
  defaultSort?: ColumnSort,
}

type ActionConfiguration<T> = {
  messageKey: string,
  tableHeaderGroups: HeaderGroup<T>[],
  tableOptionsState: TableOptionsValue,
  tableOptions: DefaultTableOptions,
  options?: ActionOptions,
}

export default function useTableActions<T>(
  configuration: ActionConfiguration<T>
) : TableActionsHook {

  const sortConfiguration = useTableSorting<T>(
    configuration.messageKey,
    configuration.tableHeaderGroups,
    configuration.options?.defaultSort ?? configuration.tableOptionsState.sorting[0],
    configuration.tableOptions.onSortingChange,
  );

  const filterConfiguration = useTableFilter<T>(
    configuration.messageKey,
    configuration.tableHeaderGroups,
    configuration.tableOptionsState.columnFilters,
    configuration.tableOptions.onColumnFiltersChange,
  );

  return {
    onGlobalFilterChange: configuration.tableOptions.onGlobalFilterChange,
    onRowSelectionChange: configuration.tableOptions.onRowSelectionChange,
    sortConfiguration,
    filterConfiguration,
  };
}
