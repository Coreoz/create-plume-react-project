Plume admin React TS
====================

Development workstation installation
------------------------------------
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

Configuration after project creation
------------------------------------
See the Plume archetype project for some [documentation about project configuration](https://github.com/Coreoz/create-plume-react-project#configuration-after-project-creation).

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
- Important external libraries:
  - [react-hook-form](https://github.com/react-hook-form/react-hook-form)
  - [MUI](https://mui.com/)
  - [react-router](https://reactrouter.com/)
  - [dayjs](https://github.com/iamkun/dayjs) : the alternative to Moment.js
  - [validator.js](https://github.com/validatorjs/validator.js)
  - [simple-http-rest-client](https://github.com/Coreoz/simple-http-rest-client)
  - [simple-logging-system](https://github.com/Coreoz/simple-logging-system)
  - [simple-job-scheduler](https://github.com/Coreoz/simple-job-scheduler)
  - [browser-user-session](https://github.com/Coreoz/browser-user-session)

Prepare administration deployment
---------------------------------
If your project involves two front-end applications (an FO and a BO), you'll need to think about the configuration required to access the right resources.

### Configuration vite
In the `vite.config.ts` file, add the base path admin to specify the path on which the sources will be accessible:

```
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [reactRefresh()],
    base: '/admin/',
    build: {
        outDir: 'build'
    },
    server: {
        proxy: {
            '/api': 'http://localhost:8080'
        }
    }
})
```

### `react-router-dom` configuration
To separate access to the two front-end applications, the basic admin router must specify the path on which the application can be accessed: `/admin`

```
<StrictMode>
  <Router basename="/admin">
    <app.render />
  </Router>
</StrictMode>
```

Add a mixin import to all SCSS modules
--------------------------------------

`assets/scss/variables` are imported in all SCSS modules by default.  
If you want to do the same for mixins :
1) Create a mixin folder `assets/scss/mixins`, add as many mixin files as you want in it
2) Add an `_index.scss` file in the folder, and reference the created mixin files
3) Reference the created index file in `assets/scss/app.scss`
4) In vite.config.ts, add the following code :
```typescript
export default defineConfig({
    ...,
    css: {
        ...,
        preprocessorOptions: {
            scss: {
                additionalData: '@use \'@scssVariables\' as *; @use \'@scssMixins\' as *;',
            },
        },
    },
    resolve: {
        alias: {
            ...,
            '@scssMixins': path.resolve(__dirname, 'assets/scss/mixins'),
        },
    },
});
```
5) In typed-scss-modules.config.ts, add the following code :
```typescript
// This is configuration for the `typed-scss-modules` package to enable SCSS modules
export default {
    ...,
    aliases: { '@scssVariables': 'assets/scss/variables/', '@scssMixins': 'assets/scss/mixins/' },
    additionalData: '@use \'@scssVariables\' as *; @use \'@scssMixins\' as *;',
};
```

# CSS Modules
## Configuration
CSS modules are configured in `vite.config.ts` and `typed-scss-modules.config.ts`.
In you want to remove local scope of CSS modules, add the following in vite.config.ts :
```typescript
{
  ...
  css: {
    modules: {
      generateScopedName: (name) => { 
        return name;
      },  
    },
  ...
}
```

## Usage, guidelines and good practices
Usage :
```
import scss from './component.module.scss';

export default function Component() {
  return (
    <HtmlTag className={scss.myElementBlockModifier or scss['my-element_block--modifier'}}>
       ...
    </HtmlTag>
  );
}
```
- CSS Modules are compiled in a scss-types directory. The generated files follow the same structure as the source files.
- Name your file like this : `<component's name>.module.scss`
- Add the scss module in the same directory as the component in which it is used
- Do not import the scss module in another component
- Map your modifier class to a typescript enum

# Forms
## Presentation
Forms are handled by the react-hook-form library https://react-hook-form.com/.

An additional library is used to simplify the use of react-hook-form with MUI : https://github.com/dohomi/react-hook-form-mui

## Usage, guidelines and good practices
### Usage
Several inputs are already implemented in the template, you will find them under src > components > theme > form.
### Form validation
React Hook Form offers a simple API to create an input validation.

To create your own validator, add it in `Validators.ts`, :
```ts
const checkRegexpMatches = (value: string, regExp: RegExp) => {
  const match: RegExpMatchArray | null = value.match(regExp);
  return !!match && match.length >= 1;
};

export const checkHasLowerChar = (value: string): boolean => checkRegexpMatches(value, /[a-z]/g);
```
and use it in your input like this :
```tsx
<InputPassword
    name="password"
    label={messages.users.password}
    autoComplete="off"
    rules={{
      required: isCreation,
      validate: {
        empty_field: checkEmptyTrimmed,
        password_length: (pass: string) => pass.length >= 8,
        password_lower_character: checkHasLowerChar,
        password_number_character: checkHasNumberChar,
        password_upper_character: checkHasUpperChar,
        password_special_character: checkHasSpecialChar,
      },
    }}
    errorMessageMapping={makeErrorMessageMapping('other error')}
/>
```
then write the corresponding error in your translations `Translations.ts`, under `error.field.<you_error>`.

You can also write your own message mapper with the `errorMessageMapping` props.
