import type { SQL, T } from '@acme/db';
import type { IDbApiContext } from '../types';

/**
 * @function getServices
 * @description Get a list of Service rows
 */
export async function getServices<C extends T.ServiceSelection>({
    columns,
    where,
    limit,
    orderBy,
    ctx,
}: {
    columns: C;
    where: SQL | undefined;
    limit?: number;
    orderBy?: SQL | undefined;
    ctx: Pick<IDbApiContext, 'dbx'>;
}) {
    return await ctx.dbx(db => db.query.Service.findMany({ columns, where, limit, orderBy }));
}
