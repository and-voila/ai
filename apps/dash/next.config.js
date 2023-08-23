module.exports = {
  reactStrictMode: true,
  transpilePackages: ['ui'],
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      'googleusercontent.com',
      'oaidalleapiprodscus.blob.core.windows.net',
      'cdn.openai.com',
    ],
  },
};
