import path from 'path';
import express, { static as expressStatic } from 'express';
import { env } from './env';

/**
 * @const app
 * @description Initialized express app
 */
export const app = express();

// Serve static files from ../merchant-site/dist
const staticPath = path.join(import.meta.dirname, '../..', 'merchant-site', 'dist');
app.use(expressStatic(staticPath));

/**
 * Start server & listen on port
 */
export const server = app.listen(env.PORT, () => {
    console.log(`apps/merchant-site-static is running on port ${env.PORT}`);
});
