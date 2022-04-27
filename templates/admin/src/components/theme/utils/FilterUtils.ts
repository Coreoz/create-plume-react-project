import { ObjectFilterProps } from '../../../lib/plume-admin-theme/list/filter/FilterProps';

/**
 * This method is called every time a filter is clicked
 * This method returns the filters state after a click
 * @param filterElementKey: the key of the filter that was clicked
 * @param newValue: the value selected in the filter
 * @param isChecked: the state of the checkbox of the filter value
 * @param allValues: the current state of the filters
 */
export function checkValueForFilter(
  filterElementKey: string,
  newValue: string,
  isChecked: boolean,
  allValues: Map<string, string[]>
): Map<string, string[]> {
  const currentFiltersClone: Map<string, string[]> = new Map<string, string[]>(allValues);
  let currentFiltersForKey = currentFiltersClone.get(filterElementKey);
  if (!currentFiltersForKey) {
    currentFiltersForKey = [];
  }
  const index = currentFiltersForKey.indexOf(newValue);
  if (index >= 0 && !isChecked) {
    currentFiltersForKey.splice(index, 1);
  } else if (isChecked) {
    currentFiltersForKey.push(newValue);
  }
  currentFiltersClone.set(filterElementKey, currentFiltersForKey);

  return currentFiltersClone;
}

/**
 * This methods checks if a filter has selected values to filter
 * @param currentFilters: the filters state
 */
function hasSelectedValues(currentFilters: Map<string, string[]>): boolean {
  if (currentFilters.size < 1) {
    return false;
  }
  let hasValues = false;
  currentFilters.forEach(value => {
    hasValues = hasValues || value.length > 0
  });
  return hasValues;
}

/**
 * This method applies a filter from its keyExtractor
 * @param listToFilter: the full list to filter
 * @param filter: the filter
 * @param selectedValues: the selected values that must be filtered
 */
function applyFilter<T>(listToFilter: T[], filter: ObjectFilterProps<T>, selectedValues: string[]): T[] {
  if (selectedValues.length === 0) {
    return listToFilter;
  }
  return listToFilter
    .filter(value => selectedValues.includes(filter.keyExtractor(value)));
}

/**
 * This method returns the filtered list from parameters
 * @param rawList: the list to filter
 * @param currentFilters: the current filters to handle (key and values)
 * @param declaredFilters: all the declared filters
 */
export function filteredList<T>(
  rawList: T[],
  currentFilters: Map<string, string[]>,
  declaredFilters: ObjectFilterProps<T>[]
): T[] {
  if (!hasSelectedValues(currentFilters)) {
    // if no filters are selected, then we return the whole list
    return rawList;
  }
  let result: T[] = rawList;
  declaredFilters.forEach((declaredFilter: ObjectFilterProps<T>) => {
    result = applyFilter(result, declaredFilter, currentFilters.get(declaredFilter.filterKey) || []);
  });
  return result;
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
