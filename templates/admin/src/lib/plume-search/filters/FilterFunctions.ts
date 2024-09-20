export type FilterFunction<TData, TFilter> = {
  (
    rowValue: TData,
    filterValue: TFilter,
  ): boolean,
};

// utils
const isArrayEmpty = (filterValue: unknown[]) => filterValue.length === 0;

// filters
const includesStringInsensitive: FilterFunction<unknown, string> = (
  rowValue: unknown,
  filterValue: string,
) => {
  const search: string = filterValue.toString().toLowerCase();
  return Boolean(
    rowValue?.toString()?.toLowerCase()?.includes(search),
  );
};

const includesStringSensitive: FilterFunction<unknown, string> = (
  rowValue: unknown,
  filterValue: string,
) => Boolean(rowValue?.toString()?.includes(filterValue));

const equalsString: FilterFunction<unknown, string> = (
  rowValue: unknown,
  filterValue: string,
) => (rowValue?.toString().toLowerCase() === filterValue.toLowerCase());

const arrIncludes: FilterFunction<unknown, unknown[]> = (
  rowValue: unknown,
  filterValue: unknown[],
) => filterValue.includes(rowValue);

const nonEmptyArrayIncludes: FilterFunction<unknown, unknown[]> = (
  rowValue: unknown,
  filterValue: unknown[],
) => isArrayEmpty(filterValue) || filterValue.includes(rowValue);

const arrayIncludesAll: FilterFunction<unknown[], unknown[]> = (
  rowValue: unknown[],
  filterValue: unknown[],
) => !filterValue.some((val: unknown) => !rowValue.includes(val));

const arrayIncludesSome: FilterFunction<unknown[], unknown[]> = (
  rowValue: unknown[],
  filterValue: unknown[],
) => filterValue.some((val: unknown) => rowValue.includes(val));

const equals: FilterFunction<unknown, unknown> = (rowValue: unknown, filterValue: unknown) => rowValue === filterValue;

const inNumberRange: FilterFunction<number, [number, number]> = (
  rowValue: number,
  filterValue: [number, number],
) => {
  const [min, max] = filterValue;
  return rowValue >= min && rowValue <= max;
};

// Export
const filterFunctions: {
  includesStringInsensitive: FilterFunction<unknown, string>,
  includesStringSensitive: FilterFunction<unknown, string>,
  equalsString: FilterFunction<unknown, string>,
  arrIncludes: FilterFunction<unknown, unknown[]>,
  nonEmptyArrayIncludes: FilterFunction<unknown, unknown[]>,
  arrayIncludesAll: FilterFunction<unknown[], unknown[]>,
  arrayIncludesSome: FilterFunction<unknown[], unknown[]>,
  equals: FilterFunction<unknown, unknown>,
  inNumberRange: FilterFunction<number, [number, number]>,
} = {
  includesStringInsensitive,
  includesStringSensitive,
  equalsString,
  arrIncludes,
  nonEmptyArrayIncludes,
  arrayIncludesAll,
  arrayIncludesSome,
  equals,
  inNumberRange,
};

export default filterFunctions;
