import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.flexifunnels.com",
      },
      {
        protocol: "https",
        hostname: "s.w.org",
      },
    ],
  },
};

export default nextConfig;
