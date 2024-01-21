/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
    ],
  },
  env: {
    openAiApiKey: process.env.OPENAI_API_KEY,
  },
};

module.exports = nextConfig;
