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
Quelques points clés sur les technologies utilisées sur le projet :
- L'outil de packaging est [Vite](https://vitejs.dev/config/) (plutôt que webpack et create-react-app).
- Typescript et les règles de codage eslint d'airbnb sont utilisées (la configuration d'intellij est automatique pour typescript, par contre eslint doit être configuré manuellement)
- L'injection de dépendance est faite avec [DI](https://github.com/wessberg/di)
- La gestion de l'état global est faite dans les services via l'utilisation du pattern Observable et la librairie [Micro-observables](https://github.com/BeTomorrow/micro-observables) ; Redux n'est PAS utilisé
- Les [hooks React](https://fr.reactjs.org/docs/hooks-intro.html) sont utilisés notamment pour accéder aux variables Observables
- Les librairies externes importantes :
    - [react-hook-form](https://github.com/react-hook-form/react-hook-form)
    - [Material-UI v5](https://next.material-ui.com)
    - [react-router](https://reactrouter.com/web/guides/quick-start)
    - [dayjs](https://github.com/iamkun/dayjs) : l'alternative à Moment.js
    - [validator.js](https://github.com/validatorjs/validator.js) : validation de chaine de caractères
- Quelques librairies écrites dans le cadre du projet :
    - Une gestion des requêtes HTTP (reprend en partie l'ancien code HTTP)
    - Du code pour identifier et faciliter la mise à jour de la détection de la langue
    - Un logger
    - Un scheduler pour faciliter la gestion des `interval`
    - Du code pour faciliter la mise en place d'un service de session
