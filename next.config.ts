import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "albumonline-imagens.s3.us-east-2.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
