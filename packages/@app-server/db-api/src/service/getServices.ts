import type { SQL } from '@acme/db';
import type { IDbApiContext } from '../types';

/**
 * @function getServices
 * @description Get a list of Service rows
 */
export async function getServices({
    input: { where, limit, orderBy },
    ctx,
}: {
    input: { where: SQL | undefined; limit?: number; orderBy?: SQL | undefined };
    ctx: Pick<IDbApiContext, 'dbx'>;
}) {
    return await ctx.dbx(db => db.query.Service.findMany({ where, limit, orderBy }));
}
