import { getMerchantServices } from '@acme/db-api';
import { ctx } from '~/ctx';
import { getServiceHref } from '~/util/getServiceHref';
import { Card } from './Card';

export async function ServiceList({ merchant_id }: { merchant_id: number }) {
    const services = await getMerchantServices({
        merchant_id,
        columns: { service_id: true, name: true, description: true },
        ctx,
    });

    return (
        <ul className='grid-cols-autofit grid gap-8 p-0'>
            {services.map(service => (
                <Card
                    key={service.service_id}
                    href={getServiceHref({ merchant_id, service_name: service.name })}
                    title={service.name}
                    body={service.description ?? `We do ${service.name.toLowerCase()}.`}
                />
            ))}
        </ul>
    );
}
