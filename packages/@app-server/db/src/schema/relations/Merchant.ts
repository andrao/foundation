import { relations } from 'drizzle-orm';
import { Merchant } from '../tables/Merchant';
import { Service } from '../tables/Service';

/**
 * @const MerchantRelations
 * @description Relations for the project table
 */
export const MerchantRelations = relations(Merchant, ({ many }) => ({
    services: many(Service, { relationName: `MerchantServices` }),
}));
