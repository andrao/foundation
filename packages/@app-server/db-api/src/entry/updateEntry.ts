import { createInsertSchema, eq, sql, t } from '@acme/db';
import { TRPCError } from '@trpc/server';
import type { z } from 'zod';
import type { IDbApiContext } from '../types';

const INPUT_SCHEMA = createInsertSchema(t.Entry);

/**
 * @function updateEntry
 * @description Update an Entry entity
 */
export async function updateEntry(
    input: Partial<Omit<z.infer<typeof INPUT_SCHEMA>, 'entry_id'>> & {
        entry_id: string;
    },
    ctx: Pick<IDbApiContext, 'dbx' | 'env'>,
) {
    const { entry_id, ...update } = input;

    /**
     * Update entity
     */
    const { rowsAffected: n } = await ctx.dbx(db =>
        db
            .update(t.Entry)
            .set({ ...update, updated_at: sql`CURRENT_TIMESTAMP` })
            .where(eq(t.Entry.entry_id, entry_id)),
    );

    if (n === 0) throw new TRPCError({ code: 'NOT_FOUND' });

    /**
     * @todo Publish event
     */
}
