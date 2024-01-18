import { ColumnFilter, Row } from '@tanstack/react-table';

export function computeFilterValue(
  value: string,
  filterKey: string,
  check: boolean,
  currentFilterValue: string[],
  selectedValues: ColumnFilter[],
) {
  const valuesWithoutCurrent: string[] = currentFilterValue.filter((filterValue: string) => filterValue !== value);
  if (!check && valuesWithoutCurrent.length === 0) {
    // if not checked and no values remaining for the column, then we remove it
    return selectedValues.filter((sv: ColumnFilter) => sv.id !== filterKey);
  }
  if (!check) {
    // if not checked and values remaining for the column, then we just remove the value
    return [
      ...selectedValues.filter((sv: ColumnFilter) => sv.id !== filterKey),
      {
        id: filterKey,
        value: valuesWithoutCurrent,
      },
    ];
  }
  // otherwise, adding value to the current column filter
  return [
    ...selectedValues.filter((sv: ColumnFilter) => sv.id !== filterKey),
    {
      id: filterKey,
      value: [
        ...valuesWithoutCurrent,
        value,
      ],
    },
  ];
}

export function filterListContains<T>(row: Row<T>, columnId: string, filterValue: string[]) {
  return (
    filterValue?.includes(row.getValue<string>(columnId))
  );
}

export function filterRawContains<T>(row: Row<T>, columnId: string, filterValue: string) {
  return (
    rawIncludes(row.getValue<string>(columnId), filterValue)
  );
}

/**
 * Takes a string and performs normalization by
 * - decomposing characters
 * - removes diacritics (accent marks)
 * - and converts the string to lowercase
 * @param str the char sequence to clean
 * @return string without diacritics and in lowercase
 */
function cleanString(str: string): string {
  // normalize NFD will transpose è to e + `;
  // replace will delete the `
  return str.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export function rawIncludes(a: string, b: string): boolean {
  return cleanString(a).includes(cleanString(b));
}
