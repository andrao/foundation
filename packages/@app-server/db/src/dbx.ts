import { retry } from '@andrao/tools';
import { getNeonServerlessClient, type INeonServerlessClient } from './connections/neon-serverless';

export type IDBX = typeof dbx;

/**
 * @const PREPARED_STATEMENT_ERROR_PATTERN
 * @description Pattern to match prepared statement errors
 * @comment We see these in Neon on occasion. Can retry.
 */
const PREPARED_STATEMENT_ERROR_PATTERN = /prepared statement \S+? does not exist/;

/**
 * @const MAX_RETRY_ATTEMPTS
 * @description Maximum attempts for retryable errors
 */
const MAX_RETRY_ATTEMPTS = 3;

/**
 * @function dbx
 * @description Run a database command via the default connection, with retry
 */
export async function dbx<T>(cb: (arg: INeonServerlessClient) => Promise<T>): Promise<T> {
    return await dbxNeon(cb);
}

/**
 * @function dbxNeon
 * @description Run a database command via the Neon DB connection, with retry
 */
export async function dbxNeon<T>(cb: (arg: INeonServerlessClient) => Promise<T>): Promise<T> {
    return await retry(() => cb(getNeonServerlessClient()), {
        max_attempts: MAX_RETRY_ATTEMPTS,
        src: 'dbxNeon',
        isRetryable: ({ error: err }) => {
            const error = err as { message?: string };

            return Boolean(error.message && PREPARED_STATEMENT_ERROR_PATTERN.test(error.message));
        },
    });
}
