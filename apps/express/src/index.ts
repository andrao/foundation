import { PATHS } from '@acme/paths';
import express from 'express';
import { env } from './env';

/**
 * @const app
 * @description Initialized express app
 */
export const app = express();

/**
 * @path /
 */
app.get(PATHS.home, (req, res) => {
    res.send('Hello world!');
});

/**
 * Start server & listen on port
 */
export const server = app.listen(env.PORT, () => {
    console.log(`apps/express server is running on port ${env.PORT}`);
});
