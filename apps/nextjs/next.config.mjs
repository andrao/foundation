/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',

    reactStrictMode: true,

    /** Enable hot-reloading for local packages */
    transpilePackages: [
        '@acme/infra-admin',
        '@acme/infra-constants',
        '@acme/infra-main',
        '@acme/paths',
        '@acme/ui',
        '@acme/db',
        '@acme/db-api',
        '@acme/basic-api-client',
        '@acme/basic-api',
        '@acme/actions',
        '@acme/esbuild-workspace-externals',
        '@acme/eslint',
        '@acme/license-check',
        '@acme/playground',
        '@acme/prettier',
        '@acme/scripts',
    ],

    /** Linting and typechecking are taken care of by CI */
    eslint: { ignoreDuringBuilds: true },
    typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
