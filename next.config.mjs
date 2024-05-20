/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';
import pkg from "./package.json" assert { type: 'json' };
const withNextIntl = createNextIntlPlugin();

const nextConfig = {
    output: "standalone",
    transpilePackages: Object.keys(pkg.dependencies || {}),
    serverRuntimeConfig: {
        logLevel: "debug"
    },
    images: {
        loader: 'custom',
        loaderFile: './scripts/image-loader.js',
    },
};

export default withNextIntl(nextConfig);
