import { env } from '../env-vars';
import { formatServiceName } from './formatServiceName';

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
    const service = `/services/${formatServiceName(service_name)}`;

    return env.IS_BUILD ? service : `/merchants/${merchant_id}${service}`;
}
