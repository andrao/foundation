import { createInsertSchema, t } from '@acme/db';
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
    await ctx.dbx(db => db.insert(t.Project).values(input));

    /**
     * @todo Publish event
     */
}
