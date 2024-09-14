import { eq, t, type SQL } from '@acme/db';
import { TRPCError } from '@trpc/server';
import type { IDbApiContext } from '../types';

/**
 * @function getMerchant
 * @description Get a single Merchant
 */
export async function getMerchant({
    merchant_id,
    where,
    ctx,
}: ({ merchant_id: number; where?: never } | { merchant_id?: never; where: SQL | undefined }) & {
    ctx: Pick<IDbApiContext, 'dbx'>;
}) {
    const e = await ctx.dbx(db =>
        db.query.Merchant.findFirst({
            where: merchant_id ? eq(t.Merchant.merchant_id, merchant_id) : where,
        }),
    );

    if (!e) throw new TRPCError({ code: 'NOT_FOUND' });

    return e;
}
