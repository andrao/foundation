import { eq, t, type SQL } from '@acme/db';
import { TRPCError } from '@trpc/server';
import type { IDbApiContext } from '../types';

/**
 * @function getProject
 * @description Get a single Project
 */
export async function getProject({
    input: { project_id, where },
    ctx,
}: {
    input: { project_id: string; where?: never } | { project_id?: never; where: SQL | undefined };
    ctx: Pick<IDbApiContext, 'dbx'>;
}) {
    const e = await ctx.dbx(db =>
        db.query.Project.findFirst({
            where: project_id ? eq(t.Project.project_id, project_id) : where,
        }),
    );

    if (!e) throw new TRPCError({ code: 'NOT_FOUND' });

    return e;
}
