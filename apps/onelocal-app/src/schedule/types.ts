import { z } from 'zod';

const METHODS = ['POST'] as const;

/**
 * @const SCHEDULED_WEBHOOK
 * @description Table for scheduled webhooks
 */
export const SCHEDULED_WEBHOOK = z.object({
    scheduled_webhook_id: z.string(),
    url: z.string().url(),
    time: z.date(),
    method: z.enum(METHODS),

    status: z.enum(['pending', 'sending', 'sent', 'failed']),

    /**
     * @todo Tracking retries
     * @todo headers, body
     */
    attempts: z.number().default(0),
});

export type IScheduledWebhook = z.infer<typeof SCHEDULED_WEBHOOK>;

/**
 * @const WEBHOOK_INVOCATION_ATTEMPT
 */
export const WEBHOOK_INVOCATION_ATTEMPT = z.object({
    webhook_invocation_attempt_id: z.string(),
    scheduled_webhook_id: z.string(),
    status: z.enum(['pending', 'success', 'error']),
    request_time: z.date(),

    // Response
    status_code: z.number().nullable(),
    response_time: z.date().nullable(),
});

export type IWebhookInvocationAttempt = z.infer<typeof WEBHOOK_INVOCATION_ATTEMPT>;

/**
 * @const SCHEDULE_WEBHOOK_INPUT
 * @description Input schema for the webhook schedule endpoint
 */
export const SCHEDULE_WEBHOOK_INPUT = SCHEDULED_WEBHOOK.pick({ url: true, time: true });

export type IWebhookScheduleInput = z.infer<typeof SCHEDULE_WEBHOOK_INPUT>;
