// next.config.js - Add Resend to external patterns
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'razorpay.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'resend.com',
        pathname: '**',
      },
    ],
  },
}

module.exports = nextConfig