import comments from '@eslint-community/eslint-plugin-eslint-comments/configs';
import { fixupConfigRules } from '@eslint/compat';
import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import noSecrets from 'eslint-plugin-no-secrets';
import * as regexpPlugin from 'eslint-plugin-regexp';
import pluginSecurity from 'eslint-plugin-security';
import turboPlugin from 'eslint-plugin-turbo';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import { compat, defineConfig } from '../utils.js';

export const base = defineConfig(
  {
    ignores: [
      'dist',
      'prisma/typebox',
      'build/**/*',
      'public/**/*',
      'scripts/*',
      'vite.config.*',
      '**/entry.client.tsx',
      '**/entry.server.tsx',
      '**/tests',
      'eslint.config.mjs',
      'jest.config.mjs',
      '**/generated/*',
      'build.ts',
      'storybook-static',
      '.react-router/types/**/*',
    ],
  },

  // Base JS/TS configs
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  // Good to have extras
  comments.recommended,
  regexpPlugin.configs['flat/recommended'],
  pluginSecurity.configs.recommended,

  {
    plugins: {
      turbo: turboPlugin,
      'no-secrets': noSecrets,
    },
  },

  // Tailwind plugin
  ...fixupConfigRules(compat.extends('plugin:tailwindcss/recommended')),

  // Prettier config to disable conflicting rules
  prettierConfig,

  {
    files: ['**/*.cjs'],
    languageOptions: {
      sourceType: 'commonjs',
    },
  },

  {
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      tailwindcss: {
        callees: ['classnames', 'clsx', 'ctl', 'cn', 'cva'],
      },
    },
    rules: {
      ...turboPlugin.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],

      '@typescript-eslint/no-misused-promises': [
        'warn',
        { checksVoidReturn: { attributes: false } },
      ],

      '@typescript-eslint/no-unnecessary-condition': [
        'warn',
        {
          allowConstantLoopConditions: true,
        },
      ],
      'no-secrets/no-secrets': [
        'error',
        { tolerance: 5, ignoreContent: ['DeepMockProxy<PrismaClient>'] },
      ],
      'require-await': 'off',
    },
  },
);
