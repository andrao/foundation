import { eq, t, type SQL, type T } from '@acme/db';
import { TRPCError } from '@trpc/server';
import type { IDbApiContext } from '../types';

/**
 * @function getMerchant
 * @description Get a single Merchant
 */
export async function getMerchant<C extends T.MerchantSelection>({
    merchant_id,
    where,
    columns,
    ctx,
}: (
    | { merchant_id: number; where?: never; columns: C }
    | { merchant_id?: never; where: SQL | undefined; columns: C }
) & {
    ctx: Pick<IDbApiContext, 'dbx'>;
}) {
    const e = await ctx.dbx(db =>
        db.query.Merchant.findFirst({
            columns,
            where: merchant_id ? eq(t.Merchant.merchant_id, merchant_id) : where,
        }),
    );

    if (!e) throw new TRPCError({ code: 'NOT_FOUND' });

    return e;
}
