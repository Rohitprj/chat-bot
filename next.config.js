const createNextIntlPlugin = require("next-intl/plugin");
const withPWA = require("next-pwa");
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
};

const pwaConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
});

module.exports = withNextIntl(pwaConfig(nextConfig));
