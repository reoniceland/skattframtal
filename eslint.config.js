import { configs, defineConfig } from '@reon-island/eslint-config';

export default defineConfig(
  {
    ignores: ['apps', 'packages', 'tooling'],
  },
  ...configs.base,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
