import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "assets.aceternity.com",
      },
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "th.bing.com",
      },
    ],
  },
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(); // Sesuaikan dengan struktur foldermu
    return config;
  },
};

export default nextConfig;
