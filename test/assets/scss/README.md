SCSS files tree structure
=========================

The SCSS files in the project must be structured as follows :

```
.
+-- layouts : defines the global layout of the application without going into details
|   +-- _index.scss : the index of the folder referencing all the scss files
|   +-- _header.scss
|   +-- _footer.scss
|   +-- _layout.scss
|   +-- _navigation.scss
|   +-- ...
+-- features : contains all the big features of the application
|   +-- _index.scss : the index of the folder referencing all the scss files
|   +-- _users.scss : The user management pages styles
|   +-- _log-api.scss : The log API pages styles
|   +-- ...
+-- forms : dedicated to the form components
|   +-- _input.scss
|   +-- _form.scss
|   +-- ...
+-- components : contains all the UI component of the application
|   +-- _index.scss : the index of the folder referencing all the scss files
|   +-- _popin.scss
|   +-- _modal.scss
|   +-- _button.scss
|   +-- _drawer.scss
|   +-- _button.scss
|   +-- _table.scss
|   +-- _tabs
|   +-- ...
+-- _font.scss : contains the fonts declarations
+-- _helpers.scss : contains the application very common css. This must be used with extreme precaution.
+-- _mixin.scss : with mobile/desktop breakpoint definition
+-- _root.scss : contains html default overrides
+-- _variables.scss : contains all the variables
+-- app.scss : the application SCSS entry point, it imports all the other files
.
```

Usage
-----

All the folders above must have an `_index.scss` referencing all the files inside the folders.
Then this `_index.scss` is referenced in the main `app.scss`.

