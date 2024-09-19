import { isNull, t, type T } from '@acme/db';
import type { IDbApiContext } from '../types';

/**
 * @function getAllMerchants
 * @description Get all Merchant rows
 */
export async function getAllMerchants<C extends T.MerchantSelection>({
    ctx,
    columns,
}: {
    ctx: Pick<IDbApiContext, 'dbx'>;
    columns: C;
}) {
    return await ctx.dbx(db =>
        db.query.Merchant.findMany({
            columns,
            where: isNull(t.Merchant.deleted_at),
        }),
    );
}
