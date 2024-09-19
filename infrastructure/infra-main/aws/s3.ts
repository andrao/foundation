import { CLOUDFRONT_ORIGIN_PATH } from '@acme/infra-constants/aws';
import * as aws from '@pulumi/aws';

/**
 * @const BUCKET
 * @description The S3 bucket for the repository
 */
export const BUCKET = new aws.s3.Bucket('foundation-bucket', {
    website: { indexDocument: 'index.html' },
});

// Permit public access to the bucket
const BUCKET_PUBLIC_ACCESS = new aws.s3.BucketPublicAccessBlock('assetBucketPublicAccessBlock', {
    bucket: BUCKET.id,
    blockPublicAcls: false,
    blockPublicPolicy: false,
    ignorePublicAcls: false,
    restrictPublicBuckets: false,
});

// Set 'BucketOwnerPreferred' ownership controls to allow public access
const BUCKET_OWNERSHIP_CONTROLS = new aws.s3.BucketOwnershipControls(
    'assetBucketOwnershipControls',
    {
        bucket: BUCKET.id,
        rule: { objectOwnership: 'BucketOwnerPreferred' },
    },
    { dependsOn: [BUCKET_PUBLIC_ACCESS] },
);

// Set bucket policy to allow public access only to the CloudFront origin folder
new aws.s3.BucketPolicy(
    'assetBucketAllowPublicAccess',
    {
        bucket: BUCKET.id,
        policy: BUCKET.arn.apply(arn =>
            JSON.stringify({
                Version: '2012-10-17',
                Statement: [
                    {
                        Effect: 'Allow',
                        Principal: '*',
                        Action: 's3:GetObject',
                        Resource: [
                            `${arn}/${CLOUDFRONT_ORIGIN_PATH}`,
                            `${arn}/${CLOUDFRONT_ORIGIN_PATH}/*`,
                        ],
                    },
                ],
            }),
        ),
    },
    { dependsOn: [BUCKET_OWNERSHIP_CONTROLS] },
);
