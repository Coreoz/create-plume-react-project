Plume admin Theme
=================

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
