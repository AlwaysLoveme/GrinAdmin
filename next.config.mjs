/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();

const nextConfig = {
    output: "standalone",
    transpilePackages: [],
    serverRuntimeConfig: {
        logLevel: "debug"
    },
};

export default withNextIntl(nextConfig);
