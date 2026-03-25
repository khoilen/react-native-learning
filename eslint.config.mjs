import storybook from 'eslint-plugin-storybook';

import { FlatCompat } from '@eslint/eslintrc';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import checkFile from 'eslint-plugin-check-file';
import importPlugin from 'eslint-plugin-import';
import noBarrelFiles from 'eslint-plugin-no-barrel-files';
import tsSortKeys from 'eslint-plugin-typescript-sort-keys';
import { defineConfig } from 'eslint/config';

const compat = new FlatCompat();

export default defineConfig([
  {
    ignores: [
      'jestSetup.js',
      'ios',
      'android',
      'patches',
      'storybook',
      '*.config.mjs',
    ],
  },
  ...compat.extends(
    '@react-native',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
  ),
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/**/*.[jt]s?(x)', '**/*.(test|spec).[jt]s?(x)'],
    ...compat.extends('plugin:testing-library/react')[0],
  },
  {
    files: ['**/*.tsx'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'TSInterfaceDeclaration[id.name=/Props$/]',
          message:
            "Component props should be defined using 'type' instead of 'interface'.",
        },
      ],
    },
  },
  {
    files: ['**/*.stories.tsx'],
    rules: {
      'react-native/no-inline-styles': 'off',
    },
  },
  {
    files: ['**/*.tsx'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector:
            "CallExpression[callee.object.name='StyleSheet'][callee.property.name='create']",
          message: 'Move StyleSheet.create to a separate .styles.ts file',
        },
      ],
    },
  },
  {
    files: ['**/*.test.{ts,tsx}'],
    rules: {
      'no-useless-escape': 'off',
      'no-restricted-syntax': [
        'warn',
        {
          selector:
            'Program:not(:has(FunctionDeclaration[id.name="setup"], VariableDeclarator[id.name="setup"][init.type=/FunctionExpression$/]))',
          message: "Test files must include a 'setup' function.",
        },
      ],
    },
  },

  {
    plugins: {
      'typescript-sort-keys': tsSortKeys,
      import: importPlugin,
      '@typescript-eslint': tsPlugin,
      'no-barrel-files': noBarrelFiles,
      'check-file': checkFile,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'func-style': ['error', 'expression'],
      'arrow-body-style': ['error', 'as-needed'],
      'arrow-parens': ['error', 'as-needed'],
      'prefer-const': 'error',
      'import/no-duplicates': 'error',
      'import/no-named-as-default': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      'jsx-a11y/label-has-associated-control': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'typescript-sort-keys/interface': [
        'error',
        'asc',
        {
          caseSensitive: false,
          natural: false,
          requiredFirst: true,
        },
      ],
      'react/jsx-curly-brace-presence': [
        'error',
        {
          props: 'never',
          children: 'never',
        },
      ],
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/*.{ts,tsx}': 'KEBAB_CASE',
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
      'check-file/folder-naming-convention': [
        'error',
        {
          'src/**/': 'KEBAB_CASE',
          '.rnstorybook/**/': 'KEBAB_CASE',
        },
      ],
    },
  },
  ...storybook.configs['flat/recommended'],
]);
