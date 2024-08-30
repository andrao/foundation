import { eq, sql, t } from '@acme/db';
import { TRPCError } from '@trpc/server';
import type { IDbApiContext } from '../types';

/**
 * @function deleteEntry
 * @description Delete an Entry entity
 */
export async function deleteEntry(
    input: {
        entry_id: string;
    },
    ctx: Pick<IDbApiContext, 'dbx' | 'env'>,
) {
    const { entry_id } = input;

    /**
     * Soft-delete entity
     */
    const { rowsAffected: n } = await ctx.dbx(db =>
        db
            .update(t.Entry)
            .set({ deleted_at: sql`CURRENT_TIMESTAMP`, updated_at: sql`CURRENT_TIMESTAMP` })
            .where(eq(t.Entry.entry_id, entry_id)),
    );

    if (n === 0) throw new TRPCError({ code: 'NOT_FOUND' });

    /**
     * @todo Publish event
     */
}
