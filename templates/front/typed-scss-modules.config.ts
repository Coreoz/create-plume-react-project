// This is configuration for the `typed-scss-modules` package to enable SCSS modules
export default {
  aliases: { '@scssVariables': 'assets/scss/variables' },
  outputFolder: 'scss-types',
  additionalData: '@use \'@scssVariables\' as *;',
};
