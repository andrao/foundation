import { isNull, t } from '@acme/db';
import type { IDbApiContext } from '../types';

/**
 * @function getAllMerchantIds
 * @description Get all Merchant IDs
 */
export async function getAllMerchantIds({ ctx }: { ctx: Pick<IDbApiContext, 'dbx'> }) {
    const results = await ctx.dbx(db =>
        db.query.Merchant.findMany({
            columns: { merchant_id: true },
            where: isNull(t.Merchant.deleted_at),
        }),
    );

    return results.map(e => e.merchant_id);
}
