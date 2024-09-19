import { relations } from 'drizzle-orm';
import { Merchant } from '../tables/Merchant';
import { Service } from '../tables/Service';

/**
 * @const ServiceRelations
 * @description Relations for the entry table
 */
export const ServiceRelations = relations(Service, ({ many, one }) => ({
    merchant: one(Merchant, {
        fields: [Service.merchant_id],
        references: [Merchant.merchant_id],
        relationName: `MerchantServices`,
    }),
}));
