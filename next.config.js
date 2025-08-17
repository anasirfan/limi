/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Add rewrites for domain-specific routing (fallback to middleware)
  async rewrites() {
    return {
      beforeFiles: [
        // Handle limiai.co root path - route to /assembly
        {
          source: '/',
          destination: '/assembly',
          has: [
            {
              type: 'host',
              value: 'limiai.co',
            },
          ],
        },
        // Handle limiai.co/invest - route to /limifuture
        {
          source: '/invest',
          destination: '/limifuture',
          has: [
            {
              type: 'host',
              value: 'limiai.co',
            },
          ],
        },
        // Handle www.limiai.co root path - route to /assembly
        {
          source: '/',
          destination: '/assembly',
          has: [
            {
              type: 'host',
              value: 'www.limiai.co',
            },
          ],
        },
        // Handle www.limiai.co/invest - route to /limifuture
        {
          source: '/invest',
          destination: '/limifuture',
          has: [
            {
              type: 'host',
              value: 'www.limiai.co',
            },
          ],
        },
      ],
    }
  },
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
      'mixkit.imgix.net'
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
