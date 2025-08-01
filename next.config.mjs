import createNextIntlPlugin from "next-intl/plugin";
import pkg from "./package.json" with { type: "json" };

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  transpilePackages: Object.keys(pkg.dependencies || {}),
  serverRuntimeConfig: {
    logLevel: "debug",
  },
  images: {
    loader: "custom",
    loaderFile: "./scripts/image-loader.js",
  },
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
  turbopack: {}
};

export default withNextIntl(nextConfig);
