'use strict'

module.exports = {
  jsxSingleQuote: true,
  printWidth: 120,
  semi: false,
  singleQuote: true,
  trailingComma: 'all',

  overrides: [
    {
      files: '*.ejs',
      options: {
        parser: 'html',
      },
    },
    {
      files: '*.scss',
      options: {
        trailingComma: 'none',
      },
    },
  ],
}
