import { createMerchant, createService } from '@acme/db-api';
import { ctx } from '../ctx';

const DATA = [
    {
        name: `Andrew's Stonemasonry`,
        services: [{ name: `Stone walls` }, { name: `Chimneys` }],
    },
    {
        name: `Andrew's Cleaning`,
        services: [{ name: `Kitchens` }, { name: `Gutters` }],
    },
];

export async function seedData() {
    for (const { name, services } of DATA) {
        const { merchant_id } = await createMerchant({ name }, ctx);

        console.log(`created merchant:`, merchant_id, name);

        for (const service of services) {
            const { service_id } = await createService({ merchant_id, name: service.name }, ctx);

            console.log(`  created service:`, service_id, name);
        }
    }
}
