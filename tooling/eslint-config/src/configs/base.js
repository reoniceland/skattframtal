import comments from '@eslint-community/eslint-plugin-eslint-comments/configs'
import { fixupConfigRules } from '@eslint/compat'
import js from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'
import noSecrets from 'eslint-plugin-no-secrets'
import * as regexpPlugin from 'eslint-plugin-regexp'
import pluginSecurity from 'eslint-plugin-security'
import turboPlugin from 'eslint-plugin-turbo'
import globals from 'globals'
import tseslint from 'typescript-eslint'

import { compat, defineConfig } from '../utils.js'

export const base = defineConfig(
  {
    ignores: [
      '.next',
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
      '@typescript-eslint/restrict-template-expressions': ['warn'],
      '@typescript-eslint/no-unsafe-member-access': ['warn'],
      '@typescript-eslint/prefer-nullish-coalescing': ['warn'],
      '@typescript-eslint/no-unsafe-assignment': ['warn'],
      '@typescript-eslint/no-require-imports': ['warn'],
      '@typescript-eslint/no-explicit-any': [
        'warn',
        {
          ignoreRestArgs: true,
        },
      ],
      '@typescript-eslint/no-unsafe-return': ['warn'],
      '@typescript-eslint/no-unsafe-argument': ['warn'],
      '@typescript-eslint/no-unsafe-call': ['warn'],

      '@typescript-eslint/no-non-null-assertion': ['warn'],
      '@typescript-eslint/no-redundant-type-constituents': ['warn'],
      '@typescript-eslint/no-confusing-void-expression': ['warn'],
      '@typescript-eslint/no-deprecated': ['warn'],
      '@typescript-eslint/no-extraneous-class': ['warn'],
      '@typescript-eslint/no-unnecessary-type-arguments': ['warn'],
      '@typescript-eslint/consistent-indexed-object-style': ['warn'],
      '@typescript-eslint/unbound-method': ['warn'],
      '@typescript-eslint/array-type': ['warn'],

      'no-secrets/no-secrets': ['error', { tolerance: 5 }],
      'require-await': 'off',
      'regexp/no-unused-capturing-group': 'warn',
      'regexp/prefer-question-quantifier': 'warn',
      'regexp/no-useless-escape': 'warn',
      'turbo/no-undeclared-env-vars': ['warn'],
      '@eslint-community/eslint-comments/disable-enable-pair': ['warn'],
    },
  },
)
