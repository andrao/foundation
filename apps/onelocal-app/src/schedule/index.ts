import { uuid } from '@andrao/tools';
import type { Request, Response } from 'express';
import type { ZodError } from 'zod';
import { insertScheduledWebhook } from './insertScheduleWebhook';
import { SCHEDULE_WEBHOOK_INPUT, type IWebhookScheduleInput } from './types';

/**
 * @function handleScheduleWebhookRequest
 * @description Handle webhook scheduling request from API
 */
export async function handleScheduleWebhookRequest(req: Request, res: Response) {
    /**
     * Validate request input
     */
    let input: IWebhookScheduleInput;
    try {
        input = SCHEDULE_WEBHOOK_INPUT.parse(req.body);
    } catch (err) {
        const error = err as ZodError;
        return res.status(400).send(`Invalid request: ${error.message}`);
    }

    /**
     * @todo
     * Save a record of our webhook schedule request
     */
    await insertScheduledWebhook({
        method: 'POST',
        ...input,
        scheduled_webhook_id: uuid(),
        status: 'pending',
        attempts: 0,
    });

    /**
     * Schedule our webhook?
     */
}
