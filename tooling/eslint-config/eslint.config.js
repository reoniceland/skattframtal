import { configs, defineConfig } from './src/index.js';

export default defineConfig(...configs.base, {
  languageOptions: {
    parserOptions: {
      project: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
