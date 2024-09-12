import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';
import { BUCKET } from './s3';

// Get the active Pulumi stack
const stack = pulumi.getStack();

/**
 * @const AIRBYTE_USER
 * @description The IAM user for the Airbyte connector
 */
export const AIRBYTE_USER = new aws.iam.User('foundation-airbyte', {
    name: `foundation-airbyte--${stack}`,
});

// Create an IAM policy for S3 access
const AIRBYTE_USER_S3_ACCESS_POLICY = new aws.iam.Policy('foundation-airbyte-bucket-policy', {
    policy: BUCKET.arn.apply(arn =>
        JSON.stringify({
            Version: '2012-10-17',
            Statement: [
                {
                    Effect: 'Allow',
                    Action: ['s3:ListBucket', 's3:GetObject', 's3:PutObject', 's3:DeleteObject'],
                    Resource: [arn, `${arn}/*`],
                },
            ],
        }),
    ),
});

// Attach the policy to the Airbyte user
new aws.iam.UserPolicyAttachment('foundation-airbyte-policy-attachment', {
    user: AIRBYTE_USER.name,
    policyArn: AIRBYTE_USER_S3_ACCESS_POLICY.arn,
});
