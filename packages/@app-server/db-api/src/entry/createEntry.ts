import { createInsertSchema, t } from '@acme/db';
import { safe } from '@andrao/tools';
import { TRPCError } from '@trpc/server';
import type { z } from 'zod';
import type { IDbApiContext } from '../types';

const INPUT_SCHEMA = createInsertSchema(t.Entry);

/**
 * @function createEntry
 * @description Create an Entry entity
 */
export async function createEntry(
    input: z.infer<typeof INPUT_SCHEMA> & {
        embedding?: Array<number>;
    },
    ctx: Pick<IDbApiContext, 'dbx'>,
) {
    /**
     * Validate
     */
    if (!input.user_id) throw new TRPCError({ code: 'UNAUTHORIZED', cause: 'No user_id' });

    /**
     * Save
     */
    const [entry] = await ctx.dbx(db => db.insert(t.Entry).values(input).returning());

    /**
     * @todo Publish event
     */

    return safe(entry);
}
