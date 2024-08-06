// Importing env here to validate vars on build
import './src/env.js';

/** @type {import("next").NextConfig} */
const config = {
    // images: {
    //     remotePatterns: [
    //         {
    //             // protocol: 'https',
    //             /** @comment copied from `getCDNDomain()` */
    //             // hostname: '<CDN>.cloudfront.net',
    //         },
    //     ],
    // },

    reactStrictMode: true,

    /** Enable hot-reloading for local packages */
    transpilePackages: ['@acme/constants', '@acme/paths', '@acme/ui'],

    /** Linting and typechecking are taken care of by CI */
    eslint: { ignoreDuringBuilds: true },
    typescript: { ignoreBuildErrors: true },
};

export default config;
