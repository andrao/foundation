import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/**
 * @const env
 * @description Environment variables for the NextJS app
 * @see https://vercel.com/docs/projects/environment-variables/system-environment-variables for default Vercel env vars
 */
export const env = createEnv({
    /**
     * Server-side
     */
    server: {},

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
        NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
        PORT: z.coerce.number().default(3002),
    },

    /**
     * Destructure all variables from `process.env` to make sure they aren't tree-shaken away.
     */
    runtimeEnv: {
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.PORT,
    },

    skipValidation:
        !!process.env.CI ||
        !!process.env.SKIP_ENV_VALIDATION ||
        process.env.npm_lifecycle_event === 'lint',
});
