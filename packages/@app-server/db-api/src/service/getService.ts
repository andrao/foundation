import { and, eq, isNull, t, type SQL } from '@acme/db';
import { TRPCError } from '@trpc/server';
import type { IDbApiContext } from '../types';

/**
 * @function getService
 * @description Get a single Service
 */
export async function getService({
    service_id,
    where,
    ctx,
}: ({ service_id: number; where?: never } | { service_id?: never; where: SQL | undefined }) & {
    ctx: Pick<IDbApiContext, 'dbx'>;
}) {
    const e = await ctx.dbx(db =>
        db.query.Service.findFirst({
            where: service_id
                ? and(eq(t.Service.service_id, service_id), isNull(t.Service.deleted_at))
                : where,
        }),
    );

    if (!e) throw new TRPCError({ code: 'NOT_FOUND' });

    return e;
}
