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
