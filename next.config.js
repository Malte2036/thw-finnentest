/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = withPWA({
  reactStrictMode: true,
  i18n: {
    locales: ["de"],
    defaultLocale: "de",
  },
  output: "standalone",
});

module.exports = nextConfig;
