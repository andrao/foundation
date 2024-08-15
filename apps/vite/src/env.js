import { PORTS } from '@acme/paths/ports.js';
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/**
 * @const env
 * @description Environment variables for the Vite app
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
        PORT: z.coerce.number().default(PORTS.vite),
    },

    /**
     * Destructure all variables from `process.env` to make sure they aren't tree-shaken away.
     */
    runtimeEnv: {
        NODE_ENV: import.meta.env.MODE,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        PORT: import.meta.env.PORT,
    },
});
