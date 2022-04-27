Plume admin Theme
=================

Creating a generic list filter
------------------------------

A filter is wrapped into a 'multipleChoiceFilterMenu' component that handles the display.
The filters selected must be managed by the component that calls the filter wrapper.

1. Create a filter of type RawFilterProps:
```
export const GENDER: RawFilterProps = {
  filterKey: 'gender',
  possibleValues: ['MR, 'MME'],
};
```
2. Create a 'multipleChoiceFilterMenu' from your Admin Theme
    1. Provide a 'filterMenuKey': that will be the useful for the state storage: `filterMenuKey="user"`
    2. Provide the filters you created: `filters={userFilters}`
    3. Provide the callback that will be executed when a filter is clicked: `onFilterValueClicked={(filterElementKey: string, valueSelected: string, isChecked: boolean) => {}}`
    4. Provide the current filters state: `selectedValues={currentUserFilters}`
```
<theme.multipleChoiceFilterMenu
      filterMenuKey="user"
      filters={userFilters(usersWithRoles?.roles)}
      onFilterValueClicked={(filterElementKey: string, valueSelected: string, isChecked: boolean) => {
            setCurrentUserFilters(doSomething(filterElementKey, valueSelected, isChecked, currentUserFilters));
      }}
      selectedValues={currentUserFilters}
      rawList={users}
/>
```
3. Create an entry in your translation file that matches the 'filterMenuKey' and 'filterKey' attribute
    1. For example, in our case we have 'filterMenuKey="user"' and 'filterKey: 'gender'', so the entry will be filter.user.gender
    2. Each and every filter is identified by its filterKey, and it must not be duplicated

4. Handle your filters with your component
   1. Each filter group must have its own state entry : Map<string, string[]>: `const [currentUserFilters, setCurrentUserFilters] = useState<Map<string, string[]>>();`
   2. You can use the methods inside FilterUtils to help you with this

Creating an object filter
-------------------------

An object filter is a generic list filter that preprocess your filters from the object list you want to filter.

1. Create a filter of type ObjectFilterProps<T> with T, the filtered object.
```
export const NAME: ObjectFilterProps<User> = {
  filterKey: 'name',
  keyExtractor: (user: User) => user.lastName,
};
```
2. Create a 'multipleChoiceObjectFilterMenu' from your Admin Theme
    1. Provide a 'filterMenuKey', that will be the useful for the state storage: `filterMenuKey="user"`
    2. Provide the filters you created: `filters={userFilters}`
    3. Provide the callback that will be called when the filters will change: `onFilterValueClicked={(filterElementKey: string, valueSelected: string, isChecked: boolean) => {}}`
    4. Provide the current filters state handled by your component: `selectedValues={currentUserFilters}`
    5. Provide the whole list in which you want to filter

```
<theme.multipleChoiceObjectFilterMenu
      filterMenuKey="user"
      filters={userFilters}
      onFilterValueClicked={(filterElementKey: string, valueSelected: string, isChecked: boolean) => {
            setCurrentUserFilters(doSomething(filterElementKey, valueSelected, isChecked, currentUserFilters));
      }}
      selectedValues={currentUserFilters}
      rawList={users}
/>
```

Creating a generic list sorting
-------------------------------

A sort entry is wrapped into a 'SortMenu' component that handles the display.

1. Create a sort object of type SortElementProps. You can use the method createCompareSorting in the SortUtils to help you achieve that.
```
export const NAME_DESC: SortElementProps = {
  sortKey: 'NAME_DESC',
  sortFunction: createCompareSorting<User>(
    (o: User) => o.lastName,
    false,
  )
}
```
2. Create a 'SortMenu' from your Admin Theme
   1. Provide a 'sortedObjectKey', that will be the useful for the state storage:`sortedObjectKey="User"`
   2. Provide the default sort possibility, that will be the first sort object selected:`defaultSortPossibility={NAME_DESC}`
   3. Provide the sort possibilities: `sortPossibilities={sortPossibilities}`
   4. Provide the callback executed when a sort object is selected: `onSort={(to: SortElementProps) => {}}`

3. Create an entry in your translation file that matches the 'sortMenuKey' and 'sortKey' attributes
   1. For example, in our case we have 'sortMenuKey="user"' and 'sortKey: 'NAME_DESC'', so the entry will be sort.user.name_desc
   2. Each and every sort object is identified by its sortKey, and it must not be duplicated

4. Handle your list sorting with your component
   1. Each filter group must have its own state entry of type SortElementProps: `const [currentSorting, setCurrentSorting] = useState<SortElementProps>();`
   2. You can use the methods inside SortUtils to help you with this