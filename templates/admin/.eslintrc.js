module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  root: true,
  extends: [
    'plugin:react/recommended',
    'airbnb-base',
    'airbnb-typescript',
    'plugin:compat/recommended',
    'plugin:jsx-a11y/recommended',
    // à décommenter pour voir l'usage des fonctions un peu exotiques
    // => par contre on ne peut pas laisser ce plugin tout le temps
    // => car il ne tient ni compte des polyfill, ni des navigateurs configurés dans browserslist
    // 'plugin:typescript-compat/recommended',
    'plugin:@sayari/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.eslint.json'
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'react-hooks'
  ],
  settings: {
    react: {
      version: "detect",
    },
    polyfills: [
      'AbortController',
      'PromiseConstructor.allSettled',
      // these methods are not present in IE 11, but this browser is not supported, so we consider them polyfilled
      'Promise.catch',
      'Promise.then',
      'Promise.finally',
      'PromiseConstructor.resolve',
      'String.startsWith',
      'Array.includes',
      'ArrayConstructor.from',
      'ObjectConstructor.values',
      'Map.values',
      'Map.keys',
    ]
  },
  rules: {
    'max-len': ["error", { "code": 120 }],
    'react/require-default-props': 0,
    'import/no-absolute-path': 'off',
    'function-paren-newline': 'off',
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message: 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],
    // Forbid @ts-ignore statements
    '@typescript-eslint/ban-ts-comment': 'error',
    // Forbid any usage
    '@typescript-eslint/no-explicit-any': 2,
    // Allow defining using functions before their declaration
    '@typescript-eslint/no-use-before-define': ['error', {
      'functions': false,
    }],
    // Uniformize TS type members delimiter (comma instead of semicolon)
    "@typescript-eslint/member-delimiter-style": ["error", {
      "multiline": {
        "delimiter": "comma",
        "requireLast": true
      },
      "singleline": {
        "delimiter": "comma",
        "requireLast": false
      }
    }],
    // Force explicit type definition
    '@typescript-eslint/typedef': [
      'error',
      {
        'arrayDestructuring': false,
        'arrowCallSignature': true,
        'arrowParameter': true,
        'callSignature': true,
        'memberVariableDeclaration': true,
        'parameter': true,
        'propertyDeclaration': true,
        'objectDestructuring': false,
        'variableDeclaration': true,
        'variableDeclarationIgnoreFunction': true
      }
    ],
    'react-hooks/rules-of-hooks': 'error',
    // Add all your custom hooks which have dependencies in the additional hooks
    // If you have several hooks, here is the syntax 'additionalHooks': '(hook1|hook2)'
    'react-hooks/exhaustive-deps': ['warn', { 'additionalHooks': 'useOnDependenciesChange|useEffectWithSsrSupport|useObservableLoader' }],
  },
};
