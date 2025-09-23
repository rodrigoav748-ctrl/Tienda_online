/** @type {import('next').NextConfig} */
const config = {
  output: 'standalone',
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true
  }
};

export default config;
