/** @type {import("eslint").Linter.Config} */
const config = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
  plugins: ['@typescript-eslint', 'react-hooks', 'react', 'drizzle'],
  extends: [
    'plugin:drizzle/recommended',
    'plugin:react-hooks/recommended',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  overrides: [
    {
      files: ['*.js'],
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
    },
  ],
  globals: {
    React: true,
    google: true,
    mount: true,
    NodeJS: true,
    mountWithRouter: true,
    shallow: true,
    shallowWithRouter: true,
    context: true,
    expect: true,
    jsdom: true,
    JSX: true,
  },
  rules: {
    '@tanstack/query/no-rest-destructuring': 'warn',
    '@tanstack/query/exhaustive-deps': 'error',
    '@tanstack/query/stable-query-client': 'error',

    'drizzle/enforce-delete-with-where': 'error',
    'drizzle/enforce-update-with-where': 'error',

    'no-constant-condition': 'warn',
    'dot-notation': 'off',
    'prefer-const': 'off',
    'no-empty': 'warn',
    'no-unused-vars': [
      'warn',
      {
        args: 'none',
      },
    ],

    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',

    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/prefer-optional-chain': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/non-nullable-type-assertion-style': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/dot-notation': 'off',
    '@typescript-eslint/no-var-requires': 'warn',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-duplicate-type-constituents': 'off',
    '@typescript-eslint/array-type': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
    '@typescript-eslint/no-useless-empty-export': 'warn',
    '@typescript-eslint/require-await': 'warn',
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      },
    ],
    '@typescript-eslint/no-misused-promises': 'off',
  },
};

module.exports = config;
