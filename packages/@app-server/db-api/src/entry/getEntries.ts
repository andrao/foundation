import type { SQL } from '@acme/db';
import type { IDbApiContext } from '../types';

/**
 * @function getEntries
 * @description Get a list of Entry rows
 */
export async function getEntries({
    input: { where, limit, orderBy },
    ctx,
}: {
    input: { where: SQL | undefined; limit?: number; orderBy?: SQL | undefined };
    ctx: Pick<IDbApiContext, 'dbx'>;
}) {
    return await ctx.dbx(db => db.query.Entry.findMany({ where, limit, orderBy }));
}
