import * as aws from '@pulumi/aws';

/**
 * @const BUCKET
 * @description The S3 bucket for the repository
 */
export const BUCKET = new aws.s3.Bucket('foundation-bucket');
