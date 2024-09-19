import type { T } from '@acme/db';
import { getAllMerchants, getMerchant } from '@acme/db-api';
import { ctx } from '~/ctx';
import { env } from '~/env-vars';

/**
 * Return all merchant IDs for which we should build pages
 */
export async function getStaticMerchants<C extends T.MerchantSelection>({
    columns,
}: {
    columns: C;
}) {
    // Use env if available
    if (env.MERCHANT_ID) {
        const merchant = await getMerchant({
            merchant_id: parseInt(env.MERCHANT_ID),
            columns,
            ctx,
        });

        return [merchant];
    }

    // Else, retrieve all IDs
    return await getAllMerchants({ ctx, columns });
}
