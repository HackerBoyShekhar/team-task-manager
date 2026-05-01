import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Set the root to the current directory to prevent 
    // it from scanning the entire user folder (C:\Users\singh\)
    // which was causing the laptop to hang.
    root: process.cwd(),
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
