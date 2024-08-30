import { createInsertSchema, eq, sql, t } from '@acme/db';
import { TRPCError } from '@trpc/server';
import type { z } from 'zod';
import type { IDbApiContext } from '../types';

const INPUT_SCHEMA = createInsertSchema(t.Project);

/**
 * @function updateProject
 * @description Update a Project entity
 */
export async function updateProject(
    input: Partial<Omit<z.infer<typeof INPUT_SCHEMA>, 'project_id'>> & {
        project_id: string;
    },
    ctx: Pick<IDbApiContext, 'dbx'>,
) {
    const { project_id, ...update } = input;

    /**
     * Update entity
     */
    const { rowsAffected: n } = await ctx.dbx(db =>
        db
            .update(t.Project)
            .set({ ...update, updated_at: sql`CURRENT_TIMESTAMP` })
            .where(eq(t.Project.project_id, project_id)),
    );

    if (n === 0) throw new TRPCError({ code: 'NOT_FOUND' });

    /**
     * @todo Publish event
     */
}
