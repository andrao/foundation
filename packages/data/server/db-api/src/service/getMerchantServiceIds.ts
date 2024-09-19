import { and, eq, isNull, t } from '@acme/db';
import type { IDbApiContext } from '../types';

/**
 * @function getMerchantServiceIds
 * @description Get a list of Service IDs for a given Merchant
 */
export async function getMerchantServiceIds({
    merchant_id,
    ctx,
}: {
    merchant_id: number;
    ctx: Pick<IDbApiContext, 'dbx'>;
}) {
    return await ctx.dbx(db =>
        db.query.Service.findMany({
            columns: { service_id: true },
            where: and(eq(t.Service.merchant_id, merchant_id), isNull(t.Service.deleted_at)),
        }),
    );
}
