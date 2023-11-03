import { Row } from '@tanstack/react-table';

export function filterListContains<T>(row: Row<T>, columnId: string, filterValue: string[]) {
  return (
    filterValue?.includes(row.getValue<string>(columnId))
  )
}

export function filterRawContains<T>(row: Row<T>, columnId: string, filterValue: string) {
  return (
    rawIncludes(row.getValue<string>(columnId), filterValue)
  )
}

function normalize(str: string): string {
  // normalize NFD will transpose è to e + `;
  // replace will delete the `
  return str.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export function rawIncludes(a: string, b: string): boolean {
  return normalize(a).includes(normalize(b));
}
