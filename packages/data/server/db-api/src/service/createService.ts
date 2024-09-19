import { createInsertSchema, t } from '@acme/db';
import { TRPCError } from '@trpc/server';
import type { z } from 'zod';
import type { IDbApiContext } from '../types';

const INPUT_SCHEMA = createInsertSchema(t.Service);

/**
 * @function createService
 * @description Create a Service entity
 */
export async function createService(
    input: z.infer<typeof INPUT_SCHEMA>,
    ctx: Pick<IDbApiContext, 'dbx'>,
) {
    const [e] = await ctx.dbx(db => db.insert(t.Service).values(input).$returningId());
    if (!e) throw new TRPCError({ code: 'NOT_FOUND' });

    /**
     * @todo Publish event
     */

    return e;
}
