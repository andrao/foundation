import { dbx } from '@acme/db';
import type { IDbApiContext } from '@acme/db-api';

/**
 * @const ctx
 * @description A db-api context to use for db-api resolvers
 */
export const ctx: IDbApiContext = {
    dbx,
    env: {},
};
