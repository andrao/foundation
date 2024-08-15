import { APP_ROUTER } from '@acme/api';
import { dbx } from '@acme/db';
import { PATHS } from '@acme/paths';
import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import express from 'express';
import { env } from './env';

/**
 * @const app
 * @description Initialized express app
 */
export const app = express();

/**
 * Enable CORS
 * @todo This enables CORS for all routes, consider enabling only for specific routes
 */
app.use(cors({ credentials: true }));

/**
 * Host tRPC router
 */
app.use(
    PATHS.api.trpc,
    trpcExpress.createExpressMiddleware({
        router: APP_ROUTER,
        createContext: ({ req }) => ({ dbx, env, headers: req.headers }),
    }),
);

/**
 * Start server & listen on port
 */
export const server = app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
});
