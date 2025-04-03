/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'satiras-closet.vercel.app'],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig 