// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactRefresh from 'eslint-plugin-react-refresh';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import reactJsxRuntime from 'eslint-plugin-react/configs/jsx-runtime.js';

export default tseslint.config(
  {
    ignores: ['dist/**/*'],
  },

  eslint.configs.recommended,

  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      globals: { ...globals.browser },
    },
    rules: {
      eqeqeq: 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'no-implicit-coercion': 'error',
      'no-implicit-globals': 'error',
      'no-unused-expressions': 'error',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      '@typescript-eslint/strict-boolean-expressions': 'error',
    },
  },
  {
    files: ['**/*.js'],
    ...tseslint.configs.disableTypeChecked,
  },

  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  reactRecommended,
  reactJsxRuntime,

  {
    plugins: {
      'react-refresh': reactRefresh,
    },
    rules: {
      'react-refresh/only-export-components': ['warn'],
    },
  },

  {
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },

  eslintConfigPrettier, // Ensure this plugin is the last one in the list to disable any previous rules that conflict with the Prettier formatter.
);
