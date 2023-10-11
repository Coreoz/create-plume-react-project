// This is configuration for the `typed-scss-modules` package to enable SCSS modules
export default {
  aliases: { '@scssVariables': 'assets/scss/variables' },
  outputFolder: 'scss-types',
  nameFormat: ['dashes', 'none'],
  additionalData: '@use \'@scssVariables\' as *;',
  exportType: 'default',
};
