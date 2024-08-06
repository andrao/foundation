import { createInsertSchema, t } from '@acme/db';
import { TRPCError } from '@trpc/server';
import type { z } from 'zod';
import type { IDbApiContext } from '../types';

const INPUT_SCHEMA = createInsertSchema(t.Project);

/**
 * @function createProject
 * @description Create a Project entity
 */
export async function createProject(
    input: z.infer<typeof INPUT_SCHEMA>,
    ctx: Pick<IDbApiContext, 'dbx'>,
) {
    const [e] = await ctx.dbx(db => db.insert(t.Project).values(input).returning());
    if (!e) throw new TRPCError({ code: 'NOT_FOUND' });

    /**
     * @todo Publish event
     */

    return e;
}
