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
    apiKey: "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",
  },
};

module.exports = nextConfig;
