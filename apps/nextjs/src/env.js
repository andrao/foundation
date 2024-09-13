import { PORTS } from '@acme/paths/ports.js';
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/**
 * @const env
 * @description Environment variables for the NextJS app
 * @see https://vercel.com/docs/projects/environment-variables/system-environment-variables for default Vercel env vars
 */
export const env = createEnv({
    server: {},
    client: {},

    /**
     * Env vars shared between server & client
     * - Node defaults, environment
     */
    shared: {
        NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
        PORT: z.coerce.number().default(PORTS.nextjs),
        VERCEL_ENV: z.enum(['development', 'preview', 'production']).default('development'),
        VERCEL_URL: z.string().optional(),
    },

    /**
     * Destructure all variables from `process.env` to make sure they aren't tree-shaken away.
     */
    runtimeEnv: {
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.PORT,
        VERCEL_ENV: process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.VERCEL_ENV,
        VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL || process.env.VERCEL_URL,
    },

    skipValidation:
        !!process.env.CI ||
        !!process.env.SKIP_ENV_VALIDATION ||
        process.env.npm_lifecycle_event === 'lint',
});
