import { ObjectFilterProps } from '../../../../lib/plume-admin-theme/list/filter/FilterProps';

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
  allValues: Map<string, string[]>,
): Map<string, string[]> {
  const currentFiltersClone: Map<string, string[]> = new Map<string, string[]>(allValues);
  let currentFiltersForKey: string[] | undefined = currentFiltersClone.get(filterElementKey);
  if (!currentFiltersForKey) {
    currentFiltersForKey = [];
  }
  const index: number = currentFiltersForKey.indexOf(newValue);
  if (index >= 0 && !isChecked) {
    currentFiltersForKey.splice(index, 1);
  } else if (isChecked) {
    currentFiltersForKey.push(newValue);
  }
  currentFiltersClone.set(filterElementKey, currentFiltersForKey);

  return currentFiltersClone;
}

/**
 * Checks if a filter has selected values to filter
 * @param currentFilters: the filters state
 */
function hasSelectedValues(currentFilters: Map<string, string[]>): boolean {
  if (currentFilters.size < 1) {
    return false;
  }
  let hasValues: boolean = false;
  currentFilters.forEach((value: string[]) => {
    hasValues = hasValues || value.length > 0;
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
    .filter((value: T) => selectedValues.includes(filter.keyExtractor(value)));
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
  declaredFilters: ObjectFilterProps<T>[],
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

/**
 * This method creates an "include" filter
 * @param filter: The object filter selected
 * @param selectedValues: the selected values of the filter menu
 */
export function createIncludesFilter<T>(filter: ObjectFilterProps<T>, selectedValues: string[]): (value: T) => boolean {
  return (value: T) => selectedValues.includes(filter.keyExtractor(value));
}

/**
 * This method creates filters from the current filters map of a component
 * @param currentFilters: The current selected filters map of a component
 * @param declaredFilters: All the filters declared in the component
 * @param filterCreator: The function that will create the filters
 */
export function createFiltersFromSelected<T>(
  currentFilters: Map<string, string[]>,
  declaredFilters: ObjectFilterProps<T>[],
  filterCreator: (filter: ObjectFilterProps<T>, selectedValues: string[]) => (value: T) => boolean,
): ((value: T) => boolean)[] {
  if (!hasSelectedValues(currentFilters)) {
    // if no filters are selected, then we return the whole list
    return [() => true];
  }
  const filtersToApply: ((value: T) => boolean)[] = [];
  declaredFilters.forEach((declaredFilter: ObjectFilterProps<T>) => {
    filtersToApply.push(filterCreator(declaredFilter, currentFilters.get(declaredFilter.filterKey) || []));
  });

  return filtersToApply;
}

/**
 * this method creates a filter from all the filters given in parameter
 * @param filtersToApply: the filters to apply
 */
export function applyFilters<T>(
  filtersToApply: ((value: T) => boolean)[],
): (value: T) => boolean {
  if (!filtersToApply.length) {
    // if no filters are present, then we juste return true
    return () => true;
  }
  // reducing the filter simulating the 'OR' comparator
  return (value: T) => filtersToApply.reduce(
    (acc: boolean, curr: (v: T) => boolean) => curr(value) || acc,
    false,
  );
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
