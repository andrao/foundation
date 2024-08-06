import { PATHS } from '@acme/paths';
import express, { json } from 'express';
import { env } from './env';
import { handleScheduleWebhookRequest } from './schedule';
import { type IScheduledWebhook } from './schedule/types';

/**
 * Instantiate my Express application
 */
const app = express();

// Parse incoming request bodies
app.use(json());

/**
 * Handle a request to our API endpoint
 */
app.post(PATHS.onelocal.SCHEDULE_WEBHOOK, (req, res) => {
    handleScheduleWebhookRequest(req, res);
});

/**
 * Start up our server
 */
app.listen(env.PORT, () => {
    console.log(`Server started at http://localhost:${env.PORT}`);
});
