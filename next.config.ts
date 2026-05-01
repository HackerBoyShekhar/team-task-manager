import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    allowedDevOrigins: ['dirty-boxes-do.loca.lt', '*.loca.lt'],
  },
  turbopack: {
    root: process.cwd(),
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
