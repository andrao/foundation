import { getAllMerchantIds } from '@acme/db-api';
import { ctx } from '~/ctx';
import { env } from '~/env.js';

/**
 * Return all merchant IDs for which we should build pages
 */
export async function getStaticMerchants() {
    // Use env if available
    if (env.MERCHANT_ID) {
        return [env.MERCHANT_ID];
    }

    // Else, retrieve all IDs
    const merchant_ids = await getAllMerchantIds({ ctx });
    return merchant_ids.map(merchant_id => merchant_id.toString());
}
