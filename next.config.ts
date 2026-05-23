// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
    // ESTO ES LO QUE TE FALTA PARA LOCALHOST
    unoptimized: true,
  },
};

export default nextConfig;
