Plume admin React TS
====================

Installation
------------
Make sure you have at least node 18 installed.

Yarn is the preferred way to set up this project. To install it, follow the instructions detailed here: <https://yarnpkg.com/getting-started/install>.

Dependencies resolution can then be done with: `yarn install`.

If you are using Intellij, you can configure ESLint & Stylelint:
1. File
2. Settings
3. Search `eslint`
4. Select `Automatic ESLint configuration`
5. OK
6. Search `stylelint`
7. Check `Enabled` in the Stylelint section
8. OK

If you are not using Intellij, make sure not to leave ESLint errors.

If you are using VSCode, you need to also execute `yarn dlx @yarnpkg/sdks vscode`

Launching the application
-------------------------
To start the application, you need to run: `yarn start`.
Then, the application can be accessed at <http://localhost:3000>.

Sometimes the first compilation fails.
If that's the case:
- If the application can be accessed in the browser at <http://localhost:3000>, it is possible to just reload the webpage: press `ctrl+r` keys
- Else, you can force the first Typescript compilation with: `yarn build`

Handling old browsers
---------------------
This project is supported only relatively new browsers.
But anything that uses a feature that requires at least es2019 should be used sparsely and carefully.

To have a look on advanced features used by the project, it is possible to:
1. In `.eslintrc.js`, uncomment the line `'plugin:typescript-compat/recommended'`
2. Run `yarn eslint`

Errors regarding IE 11 will also be raised, but at least, it enables to have a global view of what features are being
used.

Valid features being used are listing in `.eslintrc.js` in the `polyfills` part.

A banner is displayed in non-supported browsers. This is configured directly in the root `index.html` file.
`index.html` uses essential main features detection to choose weather to display the banner in non-supported browsers
or not.

Opera Mini is by default not supported though it is used in some regions in the World. To support it, the best way
would be to load dynamically `fetch` and `Promise` polyfills if these features are not available.

Sources structure
-----------------
A well-structured project greatly improve maintainability.
Here is the proposed structure for Plume-TS projects:

- `src`: Contains all the application source code except tests, including images, fonts, style etc.
- `src/api`: Contains all the technical code in charge of HTTP remote calls
- `src/assets`: Contains all the static content of the project: images, fonts, style
- `src/components`: Contains all the React based code, the `.tsx` files
- `src/components/theme`: Contains all the UI components that are reused across pages: buttons, boxes, popup, notifications, etc.
- `src/components/pages`: Contains all the pages of the application, the pages should contain few styling code since they should mainly rely on the theme component to display content
- `src/i18n`: Contains the messages entry point and the translations for each language
- `src/lib`: Contains the code that is clearly identified to be non-specific to the project and that will be externalized to separate TS dependencies
- `src/services`: Contains the business code (not technical) that handles logic and data that exists application wide: sessions, locale, notification, configuration, etc.
- `tests`: The sources tests
- files outside `src` and `tests`: File that are used to compile the project, typescript and eslint preferences

Technologies
------------
Some key points about the technologies used in the project :
- The packaging tool is [Vite](https://vitejs.dev/config/) (rather than webpack and create-react-app).
- Typescript and Airbnb's eslint coding rules are used (Intellij configuration is automatic for typescript, but eslint must be configured manually in Intellij).
- Dependency injection is performed with [DI](https://github.com/wessberg/di) and the [Plume TS DI](https://github.com/Coreoz/plume-ts-di) overlay.
- Global state management is performed in services using the Observable pattern and the [Micro-observables](https://github.com/BeTomorrow/micro-observables) library.
- Important external libraries included in this template:
    - [react-router](https://reactrouter.com/)
    - [dayjs](https://github.com/iamkun/dayjs) : the alternative to Moment.js
    - [simple-logging-system](https://github.com/Coreoz/simple-logging-system)
    - [simple-job-scheduler](https://github.com/Coreoz/simple-job-scheduler)
    - [simple-http-rest-client](https://github.com/Coreoz/simple-http-rest-client)
- External libraries that can be included if needed:
    - [react-hook-form](https://github.com/react-hook-form/react-hook-form)
    - [MUI](https://mui.com/)
    - [validator.js](https://github.com/validatorjs/validator.js)
    - [browser-user-session](https://github.com/Coreoz/browser-user-session)
