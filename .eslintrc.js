module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint/eslint-plugin'],
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['dist', 'coverage', 'node_modules'],
  overrides: [
    {
      files: ['*.ts'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:jest/recommended',
        'plugin:jest/style',
      ],
      parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
      },
      rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
        ],

        'jest/expect-expect': [
          'error',
          {
            assertFunctionNames: ['expect', 'request.**.expect'],
          },
        ],
      },
    },
  ],
}
