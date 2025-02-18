import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'sharoon.vercel.app',
      pathname: '/**'
    }]
  }};

export default nextConfig;
