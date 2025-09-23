/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Configuración para Vercel
  experimental: {
    serverActions: true,
  }
}

module.exports = nextConfig