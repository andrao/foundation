import { uriJoin } from '@andrao/tools/uriJoin';
import { env } from '~/env';
import { formatServiceName } from './formatServiceName';
import { getMerchantHref } from './getMerchantHref';

/**
 * @function getServiceHref
 * @description Return a service href based on build environment
 * @comment If in prod, omit /merchants routing
 */
export function getServiceHref({
    merchant_id,
    service_name,
}: {
    merchant_id: number;
    service_name: string;
}) {
    const merchant_path = getMerchantHref({ merchant_id });
    const service_path = `services/${formatServiceName(service_name)}`;

    // uriJoin() removes leading slash
    const href = env.IS_BUILD ? uriJoin(service_path) : uriJoin(merchant_path, service_path);

    return `/${href}`;
}
