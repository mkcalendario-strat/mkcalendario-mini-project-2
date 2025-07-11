import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_BLOB_PROTOCOL!,
        hostname: process.env.NEXT_PUBLIC_BLOB_HOSTNAME!,
        pathname: process.env.NEXT_PUBLIC_BLOB_PATHNAME!
      }
    ] as unknown as NonNullable<NextConfig["images"]>["remotePatterns"]
  }
};

export default nextConfig;
