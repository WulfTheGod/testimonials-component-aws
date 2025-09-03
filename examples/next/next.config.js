/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  transpilePackages: ['framer-motion'],
  experimental: {
    serverComponentsExternalPackages: []
  }
};

module.exports = nextConfig;