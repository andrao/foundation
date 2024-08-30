import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/**
 * @const env
 * @description Environment variables for the Vite app
 */
export const env = createEnv({
    server: {
        // Set in .env
        PLANETSCALE_HOST: z.string().optional(),
        PLANETSCALE_USERNAME: z.string().optional(),
        PLANETSCALE_PASSWORD: z.string().optional(),

        // Set by GitHub Actions
        PLANETSCALE_DATABASE_URL: z.string().optional(),
    },

    /**
     * Destructure all variables from `process.env` to make sure they aren't tree-shaken away.
     */
    runtimeEnv: {
        PLANETSCALE_HOST: process.env.PLANETSCALE_HOST,
        PLANETSCALE_USERNAME: process.env.PLANETSCALE_USERNAME,
        PLANETSCALE_PASSWORD: process.env.PLANETSCALE_PASSWORD,
        PLANETSCALE_DATABASE_URL: process.env.PLANETSCALE_DATABASE_URL,
    },
});
