import { retry } from '@andrao/tools/retry';
import { env } from '../env';
import { getLocalMySql2Client, type ILocalMySqlClient } from './connections/local';
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
export async function dbx<T>(
    connection: 'planetscale',
    cb: (arg: IPlanetScaleServerlessClient) => Promise<T>,
): Promise<T>;
export async function dbx<T>(
    connection: 'local',
    cb: (arg: ILocalMySqlClient) => Promise<T>,
): Promise<T>;
export async function dbx<T>(
    cb: (arg: IPlanetScaleServerlessClient | ILocalMySqlClient) => Promise<T>,
): Promise<T>;
export async function dbx<T>(
    input:
        | 'planetscale'
        | 'local'
        | ((arg: IPlanetScaleServerlessClient | ILocalMySqlClient) => Promise<T>),
    callback?:
        | ((arg: IPlanetScaleServerlessClient | ILocalMySqlClient) => Promise<T>)
        | ((arg: IPlanetScaleServerlessClient) => Promise<T>)
        | ((arg: ILocalMySqlClient) => Promise<T>),
): Promise<T> {
    /**
     * Determine client to use
     * @tmp env.IS_ASTRO_BUILD - what to do? override on CI?
     */
    const client_to_use =
        env.IS_ASTRO_BUILD || env.USE_LOCAL_MYSQL
            ? 'local'
            : typeof input === 'string'
              ? input
              : env.NODE_ENV === 'production'
                ? 'planetscale'
                : 'local';

    const client =
        client_to_use === 'planetscale'
            ? getPlanetScaleServerlessClient()
            : await getLocalMySql2Client();

    /**
     * Run command
     */
    const cb = typeof input === 'function' ? input : callback;
    if (!cb) throw new Error(`Invalid invocation: no callback`);

    return await retry(
        () =>
            cb(
                // @ts-expect-error: Client union disagrees with overload
                client,
            ),
        {
            max_attempts: MAX_RETRY_ATTEMPTS,
            src: 'dbx',
            isRetryable: ({ error: err }) => {
                const error = err as { message?: string };

                /**
                 * @todo Any retryable errors?
                 */
                return false;
            },
        },
    );
}
