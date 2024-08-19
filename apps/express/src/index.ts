import { readFile } from 'fs/promises';
import path from 'path';
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
 * @tmp
 */
app.get('/site', (req, res, next) => {
    readFile(path.join(import.meta.dirname, '../../astro/dist/sites/clifford/index.html'), 'utf8')
        .then(content => res.send(content))
        .catch(error => res.status(500).send((error as Error).message));
});

/**
 * Start server & listen on port
 */
export const server = app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
});
