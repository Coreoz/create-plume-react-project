# Migration guide to SWC plugin

This release updates the way we transform TypeScript code:

- from using TSC (actually TTSC) and TypeScript transformers
- to using [SWC](https://github.com/swc-project/swc) and a [Rust transformer used for dependency injection](https://github.com/Coreoz/SWC-class-decorator-plugin)

This improves compilation speed during development and builds up to 10x faster depending on the size of the project: the bigger the project, the bigger the improvement is.

On most projects, the migration should not take more than 1 hour of work.

Changing from TypeScript transformer to SWC transformer also implies changing from `jest` library to `vitest` for the
tests. As the plugin uses `Vite`, we need it for the tests as well.

Not using TypeScript anymore to transform TS code allows us to update to the latest version of `typescript`, `vite` and `eslint`.

## Changelog

- Migrate from `typescript` transformer to `swc` transformer
- Migrate from `jest` to `vitest`
- Migrate from `fetch-mock` to `msw` for mocking fetch requests
- Update to `vite` 6.2.1
- Update to `typescript` 5.8.2
- Update `yarn` to 4.7.0
- Update to `eslint` 9.23.0

## Migrating from the previous version

These instructions are meant to be followed one step after the other.

- In the root `tsconfig.json`, remove:

```diff
{
  "compilerOptions": {
-   "outDir": "ts-built",
    "target": "ESNext",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "rootDirs": [".", "./scss-types"],
    "types": ["node", "vite/client", "vite-plugin-svgr/client"],
    "skipLibCheck": true,
-    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
-    "sourceMap": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "ESNext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react",
    "strict": true,
    "strictNullChecks": true,
    "noImplicitAny": true,
    "strictFunctionTypes": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
-    "plugins": [
-      { "transform": "ts-transformer-classname", "import": "diTransformerAdapter" },
-      { "transform": "ts-transformer-classname", "import": "classNameTransformer" }
-    ],
    "paths": {
      "@api/*": ["./src/api/*"],
      "@components/*": ["./src/components/*"],
      "@i18n/*": ["./src/i18n/*"],
      "@lib/*": ["./src/lib/*"],
      "@services/*": ["./src/services/*"],
      "@assets/*": ["./assets/*"],
    }
  },
  "include": [
    "src",
    "asset.d.ts"
  ],
}
```

### Update `package.json` dependencies and scripts

```bash
yarn remove copyfiles ts-transformer-classname ttypescript
yarn add -D @vitejs/plugin-react-swc@^3.8.0 swc-class-decorator-plugin @swc/core
```

```diff
  "scripts": {
-    "start": "concurrently  \"yarn watch-ts\" \"yarn copyfiles -u 1 ./src/**/*.scss ts-built\" \"yarn watch-scss-module\" \"yarn watch-js\"",
+    "start": "concurrently \"yarn watch-scss-module\" \"yarn vite\"",
-    "watch-ts": "ttsc --incremental -w",
-    "watch-js": "vite",
    "watch-scss-module": "typed-scss-modules 'src/**/*.scss' -w -u",
    "stylelint": "stylelint '**/*.scss'",
-    "build": "yarn prepare:build && vite build",
-    "prepare:build": "yarn copyfiles -u 1 ./src/**/*.scss ts-built && ttsc",
+    "build": "rm -rf build && vite build",
    "eslint": "eslint src --ext .ts,.tsx -c .eslintrc.ci.cjs",
    "typescript": "tsc --noEmit",
    "test": "jest --config jest.config.ts",
    "coverage": "jest --config jest.config.ts --coverage --watchAll=false",
    "check-scss-types": "typed-scss-modules 'src/**/*.scss' -l"
  },
```

### Update `vite.config.ts`

```tsx
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { Options } from '@swc/core';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react({
            plugins: [['swc-class-decorator-plugin', {}]],
            useAtYourOwnRisk_mutateSwcOptions: (options: Options) => {
                options.jsc!.experimental!.runPluginFirst = true;
            },
        }),
    ],
    ...
});
```

- Delete script `copy-scss-files-in-dev` , and change `ts-built` to `src` in the alias section
- In `index.html`, modify the script tag to point to the new entry point:

```diff
-    <script type="module" src="/ts-built/index.js"></script>
+    <script type="module" src="/src/index.tsx"></script>
```

- You also can remove `/ts-built` from `.gitignore`, because it is not used anymore, and add`.swc`, which is the
  folder used by swc to store the plugin binary.
- Modify root `tsconfig.eslint.json` :

```diff
{
  "extends": "./tsconfig.json",
  "include": [
    "src",
    "asset.d.ts",
    "tests",
    "vite.config.ts",
-    "di-transformer-adapter.ts",
    "typed-scss-modules.config.ts"
  ]
}
```

- In the GitLab CI file(`.gitlab-ci.yml`), change Node version to 18.20.4
- Update yarn version to 4.7.0

```bash
yarn set version 4.7.0
```

## Migrating to [Vitest](https://vitest.dev/)

```bash
yarn remove @testing-library/jest-dom @types/jest fetch-mock-jest jest jest-config jest-environment-jsdom ts-jest node-fetch ts-node tslib fetch-mock
yarn add -D vitest @vitest/coverage-v8 fetch-mock@^12.5.2 msw
```

- Delete everything linked to `jest` : `tsconfig.test.json` , `jest.config.ts` and if there were any jest specific
  installations, check if it is still useful (`tests/installation/setupTests.ts`). It can still be used, for example, to
  setup `dayjs`

  If you need to keep a setup file, you can reference it in the `vitest.config.ts` file,
  inside [setupFiles](https://vitest.dev/config/#setupfiles)

- If jest is referenced in the `tsconfig.json`, replace it with `vitest` :

```json
{
    "compilerOptions": {
        "types": [
            "vitest/jsdom"
        ]
    }
}
```

- Create a new root config file [vitest.config.ts](../templates/admin/vitest.config.ts)
- Modify the `test` scripts in the `package.json` :

```
"scripts": {
  "test": "vitest run",
  "coverage": "vitest run --coverage",
},
```

- Finally, update test files, replace `jest` imports with `vitest` imports. For example:

```jsx
import {describe, expect, it} from 'vitest'
```

We also moved from fetch-mock to [msw](https://mswjs.io/) for mocking fetch requests. Usage example can be found in [Login.test.tsx](../templates/admin/tests/components/pages/login/Login.test.tsx)

## Troubleshooting

If there are any issues after the migration, you can try to re clone the repository. For example, if you have build errors linked to class compilation

# Update typescript, vite and eslint

Updating TypeScript also implies updating eslint, and therefore switching to the new type of configuration. (https://eslint.org/docs/latest/use/configure/migration-guide)

Updating TypeScript:

- Put `"type": "module"` in `package.json`.
- Update typescript, vite and types :

```bash
yarn add -D typescript@^5.8.2 vite@^6.2.1 @types/node@^22.13.16 @types/react@^19.0.12 @types/react-dom@^19.0.4 @types/validator@^13.12.2
```

- For eslint :

```bash
yarn add -D @types/eslint eslint-plugin-react@^7.37.4 @stylistic/eslint-plugin@^4.2.0 @typescript-eslint/eslint-plugin@^8.29.0 @typescript-eslint/parser@^8.29.0 eslint@^9.23.0 eslint-config-airbnb-typescript@^18.0.0 eslint-plugin-react-hooks@^5.2.0 eslint-plugin-import@^2.31.0 eslint-plugin-compat@^6.0.2 eslint-plugin-jsx-a11y@6.10.2
```

- Delete `.eslintignore` file
- Rename `.eslintrc.ci.cjs` and add [eslint.ci.config.js](../templates/admin/eslint.ci.config.js)
- Rename `.eslintrc.cjs` and add [eslint.config.js](../templates/admin/eslint.config.js)
- Change `eslint` script of `package.json` file to :

```
"eslint": "eslint src --ext .ts,.tsx -c eslint.ci.config.js",
```
