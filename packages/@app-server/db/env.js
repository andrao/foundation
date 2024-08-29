import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/**
 * @const env
 * @description Environment variables for the Vite app
 */
export const env = createEnv({
    server: {
        PLANETSCALE_HOST: z.string(),
        PLANETSCALE_USERNAME: z.string(),
        PLANETSCALE_PASSWORD: z.string(),

        // Set by GitHub Actions
        PLANETSCALE_DATABASE_URL: z.string().optional(),

        // PG_CONNECTION_URI_USER: z.string(),
        // PG_CONNECTION_URI_MIGRATE: z.string(),
    },

    /**
     * Destructure all variables from `process.env` to make sure they aren't tree-shaken away.
     */
    runtimeEnv: {
        PLANETSCALE_HOST: process.env.PLANETSCALE_HOST,
        PLANETSCALE_USERNAME: process.env.PLANETSCALE_USERNAME,
        PLANETSCALE_PASSWORD: process.env.PLANETSCALE_PASSWORD,

        // PG_CONNECTION_URI_USER: process.env.PG_CONNECTION_URI_USER,
        // PG_CONNECTION_URI_MIGRATE: process.env.PG_CONNECTION_URI_MIGRATE,
    },
});
