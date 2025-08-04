/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'ui-avatars.com',
      'images.unsplash.com',
      'res.cloudinary.com',
      'images.pexels.com',
      'cdn.pixabay.com',
      'coverr.co',
      'media.istockphoto.com', // in case any fallback stock sources
      'media.pexels.com',
      'mixkit.imgix.net',
      'dev.api1.limitless-lighting.co.uk',
      'dev.api.limitless-lighting.co.uk',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        pathname: '/api/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'coverr.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.pexels.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'mixkit.imgix.net',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
