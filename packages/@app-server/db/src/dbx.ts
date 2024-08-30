import { retry } from '@andrao/tools';
import {
    getPlanetScaleServerlessClient,
    type IPlanetScaleServerlessClient,
} from './connections/planetscale/client';

export type IDBX = typeof dbx;

/**
 * @const MAX_RETRY_ATTEMPTS
 * @description Maximum attempts for retryable errors
 */
const MAX_RETRY_ATTEMPTS = 3;

/**
 * @function dbx
 * @description Run a database command via the default connection, with retry
 */
export async function dbx<T>(cb: (arg: IPlanetScaleServerlessClient) => Promise<T>): Promise<T> {
    return await retry(() => cb(getPlanetScaleServerlessClient()), {
        max_attempts: MAX_RETRY_ATTEMPTS,
        src: 'dbx',
        isRetryable: ({ error: err }) => {
            const error = err as { message?: string };

            /**
             * @todo Any retryable errors?
             */
            return false;
        },
    });
}
