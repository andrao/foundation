import { eq, sql, t } from '@acme/db';
import { TRPCError } from '@trpc/server';
import type { IDbApiContext } from '../types';

/**
 * @function deleteService
 * @description Delete an Service entity
 */
export async function deleteService(
    input: {
        service_id: number;
    },
    ctx: Pick<IDbApiContext, 'dbx' | 'env'>,
) {
    const { service_id } = input;

    /**
     * Soft-delete entity
     */
    const { rowsAffected: n } = await ctx.dbx(db =>
        db
            .update(t.Service)
            .set({ deleted_at: sql`CURRENT_TIMESTAMP` })
            .where(eq(t.Service.service_id, service_id)),
    );

    if (n === 0) throw new TRPCError({ code: 'NOT_FOUND' });

    /**
     * @todo Publish event
     */
}
