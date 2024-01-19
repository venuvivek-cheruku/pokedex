/** @type {import('next').NextConfig} */
const nextConfig = {
  output: {
    hybrid: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
    ],
  },
};

module.exports = nextConfig;
