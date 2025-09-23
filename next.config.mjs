/** @type {import('next').NextConfig} */
const config = {
  output: 'standalone',
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Configuración para Vercel
  experimental: {
    serverActions: true,
  }
};

export default config;
