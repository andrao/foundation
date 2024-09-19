import { isNull, t, type T } from '@acme/db';
import type { IDbApiContext } from '../types';

/**
 * @function getAllMerchantsWithServices
 * @description Get all Merchants joined to their Services
 */
export async function getAllMerchantsWithServices<
    M extends T.MerchantSelection,
    S extends T.ServiceSelection,
>({
    merchant_columns,
    service_columns,
    ctx,
}: {
    merchant_columns: M;
    service_columns: S;
    ctx: Pick<IDbApiContext, 'dbx'>;
}) {
    return await ctx.dbx(db =>
        db.query.Merchant.findMany({
            columns: merchant_columns,
            where: isNull(t.Merchant.deleted_at),
            with: {
                services: {
                    columns: service_columns,
                    where: isNull(t.Service.deleted_at),
                },
            },
        }),
    );
}
