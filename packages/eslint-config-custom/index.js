module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  root: true,
  extends: [
    'next',
    'turbo',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'next/core-web-vitals',
    'plugin:prettier/recommended',
    'prettier',
  ],
  plugins: ['react', '@typescript-eslint', 'simple-import-sort', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    'no-unused-vars': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    'prettier/prettier': 'error',
    semi: ['error', 'always'],
    'comma-style': ['error', 'last'],
    quotes: ['error', 'single', { avoidEscape: true }],
    'jsx-quotes': ['error', 'prefer-double'],
    camelcase: ['error', { properties: 'never', ignoreDestructuring: true }],
    'no-console': 'warn',
    'react/prop-types': 'off',
    'react/jsx-key': 'error',
    'react/self-closing-comp': 'error',
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',
  },
  overrides: [
    {
      files: ['*.js', '*.ts', '*.tsx'],
      parser: 'espree',
      parserOptions: {
        ecmaVersion: 2020,
      },
    },
  ],
};
