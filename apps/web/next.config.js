// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'googleusercontent.com',
      'oaidalleapiprodscus.blob.core.windows.net',
      'cdn.openai.com',
    ],
  },
  reactStrictMode: true,
  transpilePackages: ['ui'],
};

module.exports = withContentlayer(nextConfig);
