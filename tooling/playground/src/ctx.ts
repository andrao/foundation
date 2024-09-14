import { dbx } from '@acme/db';
import type { IDbApiContext } from '@acme/db-api';

export const ctx: IDbApiContext = {
    dbx,
    env: {},
};
