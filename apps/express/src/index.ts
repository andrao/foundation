import express from 'express';
import { env } from './env';

/**
 * @const app
 * @description Initialized express app
 */
const app = express();

/**
 * @path /
 */
app.get('/', (req, res) => {
    res.send('Hello World!');
});

/**
 * Start server & listen on port
 */
app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
});
