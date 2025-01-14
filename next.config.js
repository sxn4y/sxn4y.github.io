/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-apple-emojis$': 'react-apple-emojis/lib/index.js',
    };
    return config;
  },
}

module.exports = nextConfig

