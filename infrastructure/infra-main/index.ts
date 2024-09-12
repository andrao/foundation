import { AIRBYTE_USER } from './aws/iam';
import { BUCKET } from './aws/s3';
import { QUEUE } from './aws/sqs';
import { REPO } from './github/environments';

/**
 * @note Must import & use ≥1 resource from all subfiles in order for Pulumi to recognize
 */

export const AIRBYTE_USER_NAME = AIRBYTE_USER.name;
export const BUCKET_NAME = BUCKET.id;
export const GITHUB_REPO_FULL_NAME = REPO.then(r => r.fullName);
export const QUEUE_URL = QUEUE.url;
