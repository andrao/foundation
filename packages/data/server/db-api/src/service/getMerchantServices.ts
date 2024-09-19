import { and, eq, isNull, t, type T } from '@acme/db';
import type { IDbApiContext } from '../types';

/**
 * @function getMerchantServices
 * @description Get a list of Services for a given Merchant
 */
export async function getMerchantServices<C extends T.ServiceSelection>({
    columns,
    merchant_id,
    ctx,
}: {
    columns: C;
    merchant_id: number;
    ctx: Pick<IDbApiContext, 'dbx'>;
}) {
    return await ctx.dbx(db =>
        db.query.Service.findMany({
            columns,
            where: and(eq(t.Service.merchant_id, merchant_id), isNull(t.Service.deleted_at)),
        }),
    );
}
