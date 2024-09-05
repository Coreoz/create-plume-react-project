export type FilterFn<TData, FilterType> = {
  (
    rowValue: TData,
    filterValue: FilterType,
  ): boolean,
};

// utils
const arrEmpty = (filterValue: unknown[]) => (filterValue?.length ?? 0) === 0;

// filters
const includesString: FilterFn<unknown, string> = (
  rowValue: unknown,
  filterValue: string,
) => {
  const search: string = filterValue?.toString()?.toLowerCase();
  return Boolean(
    rowValue?.toString()?.toLowerCase()?.includes(search),
  );
};

const includesStringSensitive: FilterFn<unknown, string> = (
  rowValue: unknown,
  filterValue: string,
) => Boolean(rowValue?.toString()?.includes(filterValue));

const equalsString: FilterFn<unknown, string> = (
  rowValue: unknown,
  filterValue: string,
) => (rowValue?.toString()?.toLowerCase() === filterValue?.toLowerCase());

const arrIncludes: FilterFn<unknown, unknown[]> = (
  rowValue: unknown,
  filterValue: unknown[],
) => filterValue?.includes(rowValue);

const nonEmptyArrIncludes: FilterFn<unknown, unknown[]> = (
  rowValue: unknown,
  filterValue: unknown[],
) => arrEmpty(filterValue) || filterValue?.includes(rowValue);

const arrIncludesAll: FilterFn<unknown[], unknown[]> = (
  rowValue: unknown[],
  filterValue: unknown[],
) => !filterValue.some((val: unknown) => !rowValue?.includes(val));

const arrIncludesSome: FilterFn<unknown[], unknown[]> = (
  rowValue: unknown[],
  filterValue: unknown[],
) => filterValue.some((val: unknown) => rowValue?.includes(val));

const equals: FilterFn<unknown, unknown> = (rowValue: unknown, filterValue: unknown) => rowValue === filterValue;

const inNumberRange: FilterFn<number, [number, number]> = (
  rowValue: number,
  filterValue: [number, number],
) => {
  const [min, max] = filterValue;
  return rowValue >= min && rowValue <= max;
};

// Export
const filterFunctions: {
  includesString: FilterFn<unknown, string>,
  includesStringSensitive: FilterFn<unknown, string>,
  equalsString: FilterFn<unknown, string>,
  arrIncludes: FilterFn<unknown, unknown[]>,
  nonEmptyArrIncludes: FilterFn<unknown, unknown[]>,
  arrIncludesAll: FilterFn<unknown[], unknown[]>,
  arrIncludesSome: FilterFn<unknown[], unknown[]>,
  equals: FilterFn<unknown, unknown>,
  inNumberRange: FilterFn<number, [number, number]>,
} = {
  includesString,
  includesStringSensitive,
  equalsString,
  arrIncludes,
  nonEmptyArrIncludes,
  arrIncludesAll,
  arrIncludesSome,
  equals,
  inNumberRange,
};

export default filterFunctions;
