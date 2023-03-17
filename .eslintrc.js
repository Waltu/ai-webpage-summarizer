/* eslint-disable @typescript-eslint/no-var-requires */
const prettierJson = require('./.prettierrc.json')

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'only-warn'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'standard',
    'plugin:regexp/recommended',
    'plugin:jsonc/base',
    'plugin:security/recommended',
    'plugin:sonarjs/recommended',
    'plugin:yml/standard',
    'plugin:unicorn/recommended',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname
  },
  rules: {
    'prettier/prettier': ['error', prettierJson],
    'no-redeclare': 'off',
    'no-magic-numbers': 'off',
    'prefer-template': 'error',
    'max-lines-per-function': ['error', 70],
    'unicorn/no-array-callback-reference': 'off',
    'unicorn/no-useless-undefined': 'off'
  }
}
