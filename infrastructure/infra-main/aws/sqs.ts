import * as aws from '@pulumi/aws';
import type { Output } from '@pulumi/pulumi';
import * as pulumi from '@pulumi/pulumi';

/**
 * Policy types
 * @see https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_SetQueueAttributes.html
 */

interface IRedrivePolicy {
    deadLetterTargetArn: Output<string>;
    maxReceiveCount: number;
}

function redrivePolicy(policy: IRedrivePolicy): Output<string> {
    return pulumi.jsonStringify(policy);
}

type IRedriveAllowPolicy =
    | { redrivePermission: 'allowAll' | 'denyAll' }
    | { redrivePermission: 'byQueue'; sourceQueueArns: Array<string | Output<string>> };

function redriveAllowPolicy(policy: IRedriveAllowPolicy): Output<string> {
    return pulumi.jsonStringify(policy);
}

/* --- END TYPING --- */

/**
 * @const DEAD_LETTER_QUEUE
 * @description The dead-letter queue for the main repository queue
 */
const DEAD_LETTER_QUEUE = new aws.sqs.Queue('foundation-queue-dlq', {
    messageRetentionSeconds: 60 * 60 * 24 * 14,

    // delaySeconds: The number of seconds to delay the message delivery
    //   i.e.: How long to wait before we start processing the DLQ?
    //   Max: 900 (15 minutes)
    delaySeconds: 900,
});

/**
 * @const QUEUE
 * @description The SQS queue for the repository
 */
export const QUEUE = new aws.sqs.Queue('foundation-queue', {
    // messageRetentionSeconds: The number of seconds Amazon SQS retains a message (default: 4 days)
    messageRetentionSeconds: 60 * 60 * 24 * 7, // 7 days

    // visibilityTimeoutSeconds: Consumer response timeout
    visibilityTimeoutSeconds: 60 * 5,

    // redrivePolicy: Configure dead-letter queue
    redrivePolicy: redrivePolicy({
        deadLetterTargetArn: DEAD_LETTER_QUEUE.arn,
        // The number of times a consumer can receive a message from a source queue before it is moved to a dead-letter queue
        maxReceiveCount: 5,
    }),
});

// Set the redrive-allow policy for the dead-letter queue
new aws.sqs.RedriveAllowPolicy('foundation-dlq-redrive-policy', {
    queueUrl: DEAD_LETTER_QUEUE.url,
    // redriveAllowPolicy: Only allow messages from the source queue
    redriveAllowPolicy: redriveAllowPolicy({
        redrivePermission: 'byQueue',
        sourceQueueArns: [QUEUE.arn],
    }),
});
