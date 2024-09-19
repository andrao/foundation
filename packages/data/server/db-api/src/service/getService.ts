import { and, eq, isNull, t, type SQL, type T } from '@acme/db';
import { TRPCError } from '@trpc/server';
import type { IDbApiContext } from '../types';

/**
 * @function getService
 * @description Get a single Service
 */
export async function getService<C extends T.ServiceSelection>({
    columns,
    service_id,
    where,
    ctx,
}: (
    | { columns: C; service_id: number; where?: never }
    | { columns: C; service_id?: never; where: SQL | undefined }
) & {
    ctx: Pick<IDbApiContext, 'dbx'>;
}) {
    const e = await ctx.dbx(db =>
        db.query.Service.findFirst({
            columns,
            where: service_id
                ? and(eq(t.Service.service_id, service_id), isNull(t.Service.deleted_at))
                : where,
        }),
    );

    if (!e) throw new TRPCError({ code: 'NOT_FOUND' });

    return e;
}
