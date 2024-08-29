import * as aws from '@pulumi/aws';
import * as awsx from '@pulumi/awsx';
import * as pulumi from '@pulumi/pulumi';
import { REPO } from './github/environments';

// // Create an AWS resource (S3 Bucket)
// const bucket = new aws.s3.Bucket('my-bucket');

// // Export the name of the bucket
// export const bucketName = bucket.id;

export const GITHUB_REPO_FULL_NAME = REPO.then(r => r.fullName);
