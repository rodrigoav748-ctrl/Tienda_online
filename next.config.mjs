/** @type {import('next').NextConfig} */
const config = {
  output: 'standalone',
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: {
      enabled: true
    }
  }
};

export default config;
