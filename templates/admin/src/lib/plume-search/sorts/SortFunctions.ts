import { Dayjs } from 'dayjs';

export type SortingFunction<TData> = (rowA: TData, rowB: TData) => number;

export const reSplitAlphaNumeric: RegExp = /(\d+)/gm;

const alphanumeric: SortingFunction<unknown> = (rowA: unknown, rowB: unknown) => compareAlphanumeric(
  toString(rowA)
    .toLowerCase(),
  toString(rowB)
    .toLowerCase(),
);

const alphanumericCaseSensitive: SortingFunction<unknown> = (rowA: unknown, rowB: unknown) => compareAlphanumeric(
  toString(rowA),
  toString(rowB),
);

// The text filter is more basic (less numeric support)
// but is much faster
const text: SortingFunction<unknown> = (rowA: unknown, rowB: unknown) => compareBasic(
  toString(rowA)
    .toLowerCase(),
  toString(rowB)
    .toLowerCase(),
);

// The text filter is more basic (less numeric support)
// but is much faster
const textCaseSensitive: SortingFunction<unknown> = (rowA: unknown, rowB: unknown) => compareBasic(
  toString(rowA),
  toString(rowB),
);

const datetime: SortingFunction<Dayjs> = (rowA: Dayjs, rowB: Dayjs) => {
  if (rowA.isAfter(rowB)) {
    return 1;
  }
  if (rowB.isAfter(rowA)) {
    return -1;
  }
  return 0;
};

const basic: SortingFunction<string> = (rowA: string, rowB: string) => compareBasic(rowA, rowB);

// Utils

function compareBasic(a: string, b: string) {
  if (a === b) {
    return 0;
  }
  return a > b ? 1 : -1;
}

function toString(a: unknown) {
  if (typeof a === 'number') {
    if (Number.isNaN(a) || a === Infinity || a === -Infinity) {
      return '';
    }
    return String(a);
  }
  if (typeof a === 'string') {
    return a;
  }
  return '';
}

// Mixed sorting is slow, but very inclusive of many edge cases.
// It handles numbers, mixed alphanumeric combinations, and even
// null, undefined, and Infinity
function compareAlphanumeric(aStr: string, bStr: string) {
  // Split on number groups, but keep the delimiter
  // Then remove falsey split values
  const a: string[] = aStr.split(reSplitAlphaNumeric)
    .filter(Boolean);
  const b: string[] = bStr.split(reSplitAlphaNumeric)
    .filter(Boolean);

  // While
  while (a.length && b.length) {
    const aa: string = a.shift()!;
    const bb: string = b.shift()!;

    const an: number = parseInt(aa, 10);
    const bn: number = parseInt(bb, 10);

    const combo: number[] = [an, bn].sort();

    // Both are string
    if (Number.isNaN(combo[0])) {
      if (aa > bb) {
        return 1;
      }
      if (bb > aa) {
        return -1;
      }

      continue;
    }

    // One is a string, one is a number
    if (Number.isNaN(combo[1])) {
      return Number.isNaN(an) ? -1 : 1;
    }

    // Both are numbers
    if (an > bn) {
      return 1;
    }
    if (bn > an) {
      return -1;
    }
  }

  return a.length - b.length;
}

function withSortDirection<T>(
  sortFn: SortingFunction<T>,
  isDesc: boolean,
): (a: T, b: T) => number {
  return (a: T, b: T) => {
    const result: number = sortFn(a, b);
    return isDesc ? -result : result;
  };
}

// Exports

const sortingFunctions: {
  alphanumeric: SortingFunction<unknown>,
  alphanumericCaseSensitive: SortingFunction<unknown>,
  text: SortingFunction<unknown>,
  textCaseSensitive: SortingFunction<unknown>,
  datetime: SortingFunction<Dayjs>,
  basic: SortingFunction<string>,
  withSortDirection: <T>(sortFn: SortingFunction<T>, isDesc: boolean) => SortingFunction<T>,
} = {
  alphanumeric,
  alphanumericCaseSensitive,
  text,
  textCaseSensitive,
  datetime,
  basic,
  withSortDirection,
};

export default sortingFunctions;
