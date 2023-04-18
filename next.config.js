/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  env: {
    NEXT_IMG_API_KEY: process.env.NEXT_IMG_API_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
        port: "*",
        pathname: "*",
      },
    ],
  },
};

module.exports = nextConfig;
