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
    server: {
        ANTHROPIC_API_KEY: z.string(),
        OPENAI_API_KEY: z.string(),
        TOGETHER_API_KEY: z.string(),
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
        NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
        PORT: z.coerce.number().default(3000),
    },

    /**
     * Destructure all variables from `process.env` to make sure they aren't tree-shaken away.
     */
    runtimeEnv: {
        ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
        TOGETHER_API_KEY: process.env.TOGETHER_API_KEY,

        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.PORT,
    },

    skipValidation:
        !!process.env.CI ||
        !!process.env.SKIP_ENV_VALIDATION ||
        process.env.npm_lifecycle_event === 'lint',
});
