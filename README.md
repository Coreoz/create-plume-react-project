Create Plume React Project
==========================

React Plume project archetypes.

Usage
-----
Create a new project in the current folder with: `npx create-plume-react-project --template admin --projectName admin-vel`

Options
-------
Options are passed using this syntax: `npx create-plume-react-project --[optionName] [value]`
So the `template` option can be used like this: `npx create-plume-react-project --template admin`

| Name              | Default value                          | Available values        | Description                                                           |
|-------------------|----------------------------------------|-------------------------|-----------------------------------------------------------------------|
| template          | front                                  | front, admin            | The template to use                                                   |
| projectName       | my-project                             | Any string value        | The project name is used for in `package.json` and `index.html` files |
| verbose           | false                                  | true, false             | True to display extra debug information during processing             |
| targetDirectory   | Current directory                      | Any valid absolute path | The path in which the project will be initialized with the template   |
| templateDirectory | The assets directory of the create cli | Any valid absolute path | The path in which templates will be used                              |

TODO
----
- Propose a command line interface using `enquirer` to ask the user to set interactively the options
- Propose module options for the front template like `i18n`, `material`, `form`, `session`
- Use `chalk` instead of doing terminal coloration by hand
