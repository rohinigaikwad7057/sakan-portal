import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  allowedDevOrigins: [
    "192.168.0.104",
    "192.168.0.104:3001",
    "http://192.168.0.104:3001",
    "http://192.168.0.104:3002",
  ],
};

export default nextConfig;
