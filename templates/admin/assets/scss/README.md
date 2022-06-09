SCSS files tree structure
=========================

The SCSS files in the project must be structured as follows

Root folder
-----------

The root folder, meaning the scss parent folder, may contain :

- app.scss
- _root.scss
- _variables.scss
- _mixin.scss (with mobile/desktop breakpoint definition)
- _font.scss
- ...

`layouts` folder
----------------

Inside the root folder, the `layout` folder defines the global layout of the application without going into details.
The `layout` folder may contain :

- _header.scss
- _footer.scss
- _layout.scss
- _navigation.scss
- ...

`features` folder
-----------------

Inside the root folder, the `features` folder contains all the big features of the application.
The `features` folder may contain :
- _users.scss : The user management pages styles
- _log-api.scss : The log API pages styles
- ...

`forms` folder
--------------

Inside the root folder, the `forms` folder is dedicated to the form components.
The `forms` folder may contain :
- _input.scss
- _form.scss
- ...

`components` folder
-------------------

Inside the root folder, the `components` folder contains all the UI component of the application.
The `forms` folder may contain :
- _popin.scss
- _modal.scss
- _button.scss
- _drawer.scss
- _button.scss
- _table.scss
- _tabs
- ...

Usage
-----

All the folders above must have an `_index.scss` referencing all the files inside the folders.
Then this `_index.scss` is referenced in the main `app.scss`.

