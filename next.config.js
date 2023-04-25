/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  env: {
    NEXT_IMG_API_KEY: process.env.NEXT_IMG_API_KEY,
    NEXT_APP_BASE_URL: process.env.NEXT_APP_BASE_URL,
  },
  images: {
    domains: ["i.ibb.co"],
    unoptimized: true,
  },
};

module.exports = nextConfig;
