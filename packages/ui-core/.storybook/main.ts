import type { StorybookConfig } from '@storybook/react-webpack5'

import path from 'path'

import { VanillaExtractPlugin } from '@vanilla-extract/webpack-plugin'

const rootDir = (dir: string) => path.resolve(__dirname, dir)

const config: StorybookConfig = {
  typescript: {
    reactDocgen: false,
  },
  stories: [
    '../src/**/*.stories.@(tsx|mdx)',
    '../src/**/*.mdx',
    '../src/*.mdx',
  ],
  addons: [
    '@storybook/addon-a11y',
    'storybook-addon-apollo-client',
    '@storybook/addon-mdx-gfm',
    '@storybook/addon-essentials',
  ],
  babel: (options) => ({
    ...options,
    presets: [
      '@babel/preset-env',
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
        },
        'preset-react-jsx-transform',
      ],
      '@babel/preset-typescript',
    ],
    plugins: [
      '@babel/plugin-transform-class-properties',
      '@babel/plugin-transform-private-methods',
      '@babel/plugin-transform-private-property-in-object',
    ],
  }),
  webpackFinal: (config) => {
    config.plugins?.push(new VanillaExtractPlugin())
    config.devtool = false
    config.module?.rules?.push({
      test: /\.stories\.(ts|tsx)$/,
      exclude: path.resolve(__dirname, '../../../../node_modules'),
      use: [
        {
          // needed for docs addon
          loader: '@storybook/source-loader',
          options: {
            injectParameters: true,
          },
        },
      ],
    })
    config.resolve = {
      ...config.resolve,
      alias: {},
    }
    return config
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: true,
  },
}

export default config
