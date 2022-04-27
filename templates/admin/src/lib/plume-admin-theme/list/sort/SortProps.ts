export type SortElementProps = {
  sortKey: string,
  sortFunction: (a: any, b: any) => number
}

export type SortMenuProps = {
  sortedObjectKey: string,
  sortPossibilities: SortElementProps[],
  defaultSortPossibility: SortElementProps,
  onSort: (sortElement: SortElementProps) => void,
}