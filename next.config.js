/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["i.imgur.com", "api.realworld.io", "images.unsplash.com"],
  },
};

module.exports = nextConfig;
