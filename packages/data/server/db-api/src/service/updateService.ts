import { createInsertSchema, eq, t } from '@acme/db';
import { TRPCError } from '@trpc/server';
import type { z } from 'zod';
import type { IDbApiContext } from '../types';

const INPUT_SCHEMA = createInsertSchema(t.Service);

/**
 * @function updateService
 * @description Update an Service entity
 */
export async function updateService(
    input: Partial<Omit<z.infer<typeof INPUT_SCHEMA>, 'service_id'>> & {
        service_id: number;
    },
    ctx: Pick<IDbApiContext, 'dbx' | 'env'>,
) {
    const { service_id, ...update } = input;

    /**
     * Update entity
     */
    const { rowsAffected: n } = await ctx.dbx(db =>
        db.update(t.Service).set(update).where(eq(t.Service.service_id, service_id)),
    );

    if (n === 0) throw new TRPCError({ code: 'NOT_FOUND' });

    /**
     * @todo Publish event
     */
}
