/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            hostname: 'images.unsplash.com',
          },
          {
            hostname: 'res.cloudinary.com',
          },
        ],
      },
    async rewrites() {
  return [
    {
      source: '/',
      has: [
        {
          type: 'host',
          value: 'limiai.co',
        },
      ],
      destination: '/limiai',
    },
  ];
}
};

export default nextConfig;
