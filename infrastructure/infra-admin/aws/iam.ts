import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

// Get the active Pulumi stack
const stack = pulumi.getStack();

/**
 * @const ADMIN_USER
 * @description The admin IAM user for the Pulumi project
 */
export const ADMIN_USER = new aws.iam.User('foundation-admin', {
    name: `foundation-admin--${stack}`,
});

// const ADMIN_USER_POLICY = new aws.iam.Policy('foundation-admin-policy', {
//     // policy: BUCKET.arn.apply(arn =>
//     //     JSON.stringify({
//     //         Version: '2012-10-17',
//     //         Statement: [
//     //             {
//     //                 Effect: 'Allow',
//     //                 Action: ['s3:ListBucket', 's3:GetObject', 's3:PutObject', 's3:DeleteObject'],
//     //                 Resource: [arn, `${arn}/*`],
//     //             },
//     //         ],
//     //     }),
//     // ),
// });

// // Attach the policy to the Airbyte user
// new aws.iam.UserPolicyAttachment('foundation-admin-policy-attachment', {
//     user: ADMIN_USER.name,
//     policyArn: ADMIN_USER_POLICY.arn,
// });
