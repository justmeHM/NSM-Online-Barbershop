
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
  },
  clerkMiddleware: {
    isSrcDir: true, // ✅ tell Clerk you ARE using src
  },
};

export default nextConfig;
