import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';

const withVanillaExtract = createVanillaExtractPlugin({});

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  transpilePackages: [
    '@reon-island/ui-core',
    '@reon-island/ui-theme',
    '@reon-island/ui-utils',
    '@reon-island/vanilla-extract-utils',
  ],
};

export default withVanillaExtract(nextConfig);
