/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Enable PWA features
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
}

module.exports = nextConfig
