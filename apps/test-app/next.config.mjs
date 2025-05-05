import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';

const withVanillaExtract = createVanillaExtractPlugin({});

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
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
