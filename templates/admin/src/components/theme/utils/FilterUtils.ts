import { Row } from '@tanstack/react-table';

function filtersInclude<T>(
  row: Row<T>,
  columnId: string,
  filterValue: unknown[],
): boolean {
  if (filterValue && filterValue.length) {
    return filterValue?.includes(row.getValue<unknown[]>(columnId));
  } return true;
}
export default filtersInclude;
