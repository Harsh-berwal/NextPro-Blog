import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["dynamic-boar-10.eu-west-1.convex.cloud"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "dynamic-boar-10.eu-west-1.convex.cloud",
        port: "",
      },
    ],
  },
};

export default nextConfig;
