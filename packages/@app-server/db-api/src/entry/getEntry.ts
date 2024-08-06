import { and, eq, isNull, t, type SQL } from '@acme/db';
import { TRPCError } from '@trpc/server';
import type { IDbApiContext } from '../types';

/**
 * @function getEntry
 * @description Get a single Entry
 */
export async function getEntry({
    input: { entry_id, where },
    ctx,
}: {
    input: { entry_id: string; where?: never } | { entry_id?: never; where: SQL | undefined };
    ctx: Pick<IDbApiContext, 'dbx'>;
}) {
    const e = await ctx.dbx(db =>
        db.query.Entry.findFirst({
            where: entry_id
                ? and(eq(t.Entry.entry_id, entry_id), isNull(t.Entry.deleted_at))
                : where,
        }),
    );

    if (!e) throw new TRPCError({ code: 'NOT_FOUND' });

    return e;
}
