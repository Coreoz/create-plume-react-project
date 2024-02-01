Create Plume React Project
==========================

React Plume project archetypes that enables to create [React](https://github.com/facebook/react)
with [TypeScript](https://github.com/microsoft/TypeScript) projects
with dependency injection and the observable pattern to manage the application global state. 

Usage
-----
Create a new project in the current folder with:
- Yarn (more reliable): `yarn dlx create-plume-react-project --template admin --projectName admin-vel`
- Or with NPX: `npx create-plume-react-project@latest --template admin --projectName admin-vel`

Once project is created, it can be started with:
1. `yarn` to resolve dependencies
2. `yarn start` to start the project

Options
-------
Options are passed using this syntax: `npx create-plume-react-project@latest --[optionName] [value]`
So the `template` option can be used like this: `npx create-plume-react-project@latest --template admin`

| Name              | Default value                                   | Available values        | Description                                                           |
|-------------------|-------------------------------------------------|-------------------------|-----------------------------------------------------------------------|
| template          | front                                           | front, admin            | The template to use                                                   |
| projectName       | my-project                                      | Any string value        | The project name is used for in `package.json` and `index.html` files |
| verbose           | false                                           | true, false             | True to display extra debug information during processing             |
| targetDirectory   | Current directory                               | Any valid absolute path | The path in which the project will be initialized with the template   |
| templateDirectory | The build/templates directory of the create cli | Any valid absolute path | The path in which templates will be used                              |

## Configuration
### Sonar
Complete the following properties in `sonar-project-frontend.properties` file :
```
# Exemple
sonar.projectKey=project-front-ui
sonar.projectName=My project - front-ui
```

### Gitlab ci
A Gitlab ci file `.gitlab-ci.yml` is provided in the project.
It is pre-configured to run the following jobs:
- Front UI build or Admin UI build : yarn typescript && yarn eslint
- SonarQube analyze front UI or SonarQube analyze admin UI : sonar

If the frontend project is used inside a [Plume](https://github.com/Coreoz/Plume) backend project :
- Copy/paste the content of the gitlab ci file in the backend gitlab ci file
- Add `cd <frontend directory>` as the first step of each job
```
# Exemple
Front UI build:
  ...
  script:
    - cd front-ui
  ...
  
Admin UI build:
  ...
  script:
    - cd front-ui
  ...
```
- Remove the frontend gitlab ci file

Development
-----------
To set up the development environment to work on this create cli:
1. run `yarn`
2. run `yarn build`
3. run `npm link`

Then it is possible to open a new terminal anywhere on the local computer and run: `npx create-plume-react-project@latest --template admin --projectName admin-vel`

This `@latest` is important, else an older cached version of the CLI can be used by NPM,
see https://github.com/npm/cli/issues/2329 for details.

To test new changes, `yarn build` should be run.

Templates are fully working projects, so modifications in the templates should be tested
at least by running the modified templates.

TODO
----
- Propose a command line interface using `enquirer` to ask the user to set interactively the options
- Propose module options for the front template like `i18n`, `material`, `form`, `session`
- Use `chalk` instead of doing terminal coloration by hand
- Use `execa` or `pkg-install` to directly install the project
