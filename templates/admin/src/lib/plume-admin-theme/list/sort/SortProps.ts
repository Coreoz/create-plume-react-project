export type SortElementProps = {
  sortKey: string,
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  sortFunction: (a: any, b: any) => number
};

export type SortMenuProps = {
  sortedObjectKey: string,
  sortPossibilities: SortElementProps[],
  defaultSortPossibility: SortElementProps,
  onSort: (sortElement: SortElementProps) => void,
};
