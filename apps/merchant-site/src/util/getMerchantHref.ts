import { env } from '../env-vars';

/**
 * @function getMerchantHref
 * @description Return a merchant href based on build environment
 * @comment If in prod, omit /merchants routing
 */
export function getMerchantHref({ merchant_id }: { merchant_id: number }) {
    return env.IS_BUILD ? `/` : `/merchants/${merchant_id}`;
}
