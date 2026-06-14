import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/amore-nails-ct',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
