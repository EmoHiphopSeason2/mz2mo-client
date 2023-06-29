/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  customWorkerDir: 'src/worker',
  dest: 'public',
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    );

    fileLoaderRule.exclude = /\.svg$/i;
    return config;
  },
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development',
  },
};

module.exports = withPWA(nextConfig);
