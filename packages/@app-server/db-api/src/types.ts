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
export interface IDbApiEnvVars {
    ANTHROPIC_API_KEY: string;
    OPENAI_API_KEY: string;
    RUNPOD_API_KEY: string;
}
