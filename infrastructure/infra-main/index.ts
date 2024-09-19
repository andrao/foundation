import { CERTIFICATE, WILDCARD_CERTIFICATE } from './aws/acm';
import { BUCKET_CDN } from './aws/cloudfront';
import { CLOUDFRONT_DOMAIN_INDEX_REDIRECT } from './aws/cloudfront-functions/domainIndexRedirect';
import { AIRBYTE_USER } from './aws/iam';
import { BUCKET } from './aws/s3';
import { QUEUE } from './aws/sqs';
import { REPO } from './github/environments';

/**
 * @note Must import & use ≥1 resource from all subfiles in order for Pulumi to recognize
 */

export const AIRBYTE_USER_NAME = AIRBYTE_USER.name;
export const BUCKET_NAME = BUCKET.id;
export const BUCKET_CDN_DOMAIN = BUCKET_CDN.domainName;
export const GITHUB_REPO_FULL_NAME = REPO.then(r => r.fullName);
export const QUEUE_URL = QUEUE.url;
export const CERTIFICATE_ARN = CERTIFICATE.arn;
export const WILDCARD_CERTIFICATE_ARN = WILDCARD_CERTIFICATE.arn;
export const CLOUDFRONT_DOMAIN_INDEX_REDIRECT_NAME = CLOUDFRONT_DOMAIN_INDEX_REDIRECT.name;
