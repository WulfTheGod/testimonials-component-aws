/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/testimonials-component-aws' : '',
  images: {
    unoptimized: true
  },
  experimental: {
    serverComponentsExternalPackages: []
  }
};

module.exports = nextConfig;