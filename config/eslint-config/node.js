/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['@rocketseat/eslint-config/node'],
  plugins: ['simple-import-sort'],
  rules: {
    'simple-import-sort/imports': 'error',
    'no-useless-constructor': 'off',
    'no-new': 'off',
    'typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-namespace': 'off',
  },
}
