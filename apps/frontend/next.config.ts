import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // {
      //   protocol: "https",
      //   hostname: "loremflickr.com",
      // },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      // {
      //   protocol: "https",
      //   hostname: "tmpddpfoickfjtwfnbyo.supabase.co",
      //   port: "",
      //   pathname: "/**",
      // },
    ],
  },
  /* config options here */
};

export default nextConfig;
