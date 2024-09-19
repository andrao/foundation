import type { IDBX } from '@acme/db';

/**
 * @interface IDbApiContext
 * @description Context for DB API calls
 */
export interface IDbApiContext {
    dbx: IDBX;
    env: IDbApiEnvVars;
}

/**
 * @interface IDbApiEnvVars
 * @description Environment variables required for DB API calls
 */
export type IDbApiEnvVars = Record<string, never>;
