/* eslint-disable @typescript-eslint/no-var-requires */
const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
});

module.exports = withNextra({
  reactStrictMode: true,
  transpilePackages: ['ui'],
});
