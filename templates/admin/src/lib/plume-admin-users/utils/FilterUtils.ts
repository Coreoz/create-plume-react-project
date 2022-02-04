import { FilterElementProps } from '../../plume-admin-theme/list/ListProps';

export function handleFilterValue(
  filterElement: FilterElementProps<any>,
  newValue: string,
  isChecked: boolean,
  allValues: Map<string, string[]>
): Map<string, string[]> {
  const currentFiltersClone: Map<string, string[]> = new Map<string, string[]>(allValues);
  let currentFiltersForKey = currentFiltersClone.get(filterElement.filterKey);
  if (!currentFiltersForKey) {
    currentFiltersForKey = [];
  }
  const index = currentFiltersForKey.indexOf(newValue);
  if (index >= 0 && !isChecked) {
    currentFiltersForKey.splice(index, 1);
  } else if (isChecked) {
    currentFiltersForKey.push(newValue);
  }
  currentFiltersClone.set(filterElement.filterKey, currentFiltersForKey);

  return currentFiltersClone;
}

export function applyFilter<T>(listToFilter: T[], filter: FilterElementProps<T>, selectedValues: string[]): T[] {
  if (selectedValues.length === 0) {
    return listToFilter;
  }
  return listToFilter
    .filter(value => selectedValues.includes(filter.keyExtractor(value)));
}

export function filteredList<T>(
  rawList: T[],
  currentFilters: Map<string, string[]>,
  declaredFilters: { [key: string]: FilterElementProps<T> }
): T[] {
  if (!hasSelectedValues(currentFilters)) {
    return rawList;
  }
  let result: T[] = rawList;
  currentFilters.forEach((value: string[], key: string) => {
    const filter: FilterElementProps<T> = declaredFilters[key];
    result = applyFilter(result, filter, value);
  });
  return result;
}

export function hasSelectedValues(currentFilters: Map<string, string[]>): boolean {
  if (currentFilters.size < 1) {
    return false;
  }
  let hasValues = false;
  currentFilters.forEach(value => {
    hasValues = hasValues || value.length > 0
  });
  return hasValues;
}

function normalize(str: string): string {
  // normalize NFD will transpose è to e + `;
  // replace will delete the `
  return str.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}
export function compare(a: string, b: string): boolean {
  return normalize(a).includes(normalize(b));
}
