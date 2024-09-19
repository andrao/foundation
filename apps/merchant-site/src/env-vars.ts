import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/**
 * @const env
 * @description Environment variables for the Astro app
 */
export const env = createEnv({
    /**
     * Server-side
     */
    server: {
        MERCHANT_ID: z.string().optional(),
    },

    /**
     * Client-side
     * - For them to be exposed, prefix with `NEXT_PUBLIC_`.
     */
    client: {},

    /**
     * Env vars shared between server & client
     * - Node defaults, environment
     */
    shared: {
        IS_BUILD: z.boolean(),
        NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    },

    /**
     * Destructure all variables from `process.env` to make sure they aren't tree-shaken away.
     */
    runtimeEnv: {
        IS_BUILD: process.env.NODE_ENV === 'production',
        MERCHANT_ID: process.env.MERCHANT_ID,
        NODE_ENV: process.env.NODE_ENV,
    },

    skipValidation:
        !!process.env.CI ||
        !!process.env.SKIP_ENV_VALIDATION ||
        process.env.npm_lifecycle_event === 'lint',
});
