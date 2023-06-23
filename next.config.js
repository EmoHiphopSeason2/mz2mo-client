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
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ },
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
