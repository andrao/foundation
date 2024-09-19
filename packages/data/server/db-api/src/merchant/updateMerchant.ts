import { createInsertSchema, eq, t } from '@acme/db';
import { TRPCError } from '@trpc/server';
import type { z } from 'zod';
import type { IDbApiContext } from '../types';

const INPUT_SCHEMA = createInsertSchema(t.Merchant);

/**
 * @function updateMerchant
 * @description Update a Merchant entity
 */
export async function updateMerchant(
    input: Partial<Omit<z.infer<typeof INPUT_SCHEMA>, 'merchant_id'>> & {
        merchant_id: number;
    },
    ctx: Pick<IDbApiContext, 'dbx'>,
) {
    const { merchant_id, ...update } = input;

    /**
     * Update entity
     */
    const { rowsAffected: n } = await ctx.dbx(db =>
        db.update(t.Merchant).set(update).where(eq(t.Merchant.merchant_id, merchant_id)),
    );

    if (n === 0) throw new TRPCError({ code: 'NOT_FOUND' });

    /**
     * @todo Publish event
     */
}
