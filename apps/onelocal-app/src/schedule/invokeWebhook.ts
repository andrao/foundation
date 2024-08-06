import { uuid } from '@andrao/tools';
import { insertWebhookInvocationAttempt } from './insertWebhookInvocationAttempt';
import type { IScheduledWebhook, IWebhookInvocationAttempt } from './types';

export async function invokeWebhook({
    scheduled_webhook,
}: {
    scheduled_webhook: IScheduledWebhook;
}) {
    const { scheduled_webhook_id } = scheduled_webhook;
    const webhook_invocation_attempt_id = uuid();

    /**
     * Add a record of the webhook invocation attempt
     */
    await insertWebhookInvocationAttempt({
        webhook_invocation_attempt_id,
        scheduled_webhook_id,
        request_time: new Date(),
        status: 'pending',

        status_code: null,
        response_time: null,
    });

    /**
     * Call webhook
     */
    let status: IWebhookInvocationAttempt['status'];

    try {
        const response = await fetch(scheduled_webhook.url, {
            method: scheduled_webhook.method,
        });

        status = updateWebhookInvocationAttempt({
            webhook_invocation_attempt_id,
            status_code: response.status,
        });
    } catch (error) {
        status = updateWebhookInvocationAttempt({
            webhook_invocation_attempt_id,
            status_code: 500,
        });
    }

    /**
     * If we have failed, conditional retry
     */
}

function updateWebhookInvocationAttempt({
    webhook_invocation_attempt_id,
    status_code,
}: {
    webhook_invocation_attempt_id: string;
    status_code: number;
}) {
    const status: IWebhookInvocationAttempt['status'] = status_code <= 299 ? 'success' : 'error';

    // await db.update('webhook_invocation_attempts', {
    //     status,
    //     status_code,
    //     response_time: new Date()
    // });

    return status;
}
