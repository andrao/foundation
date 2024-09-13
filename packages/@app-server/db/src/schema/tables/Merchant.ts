import { bigint, varchar } from 'drizzle-orm/mysql-core';
import { createTable } from '../common/createTable';

/**
 * @const Merchant
 * @description The Merchant table
 */
export const Merchant = createTable({
    name: 'merchant',
    columns: {
        merchant_id: bigint('merchant_id', { mode: 'number', unsigned: true })
            .autoincrement()
            .primaryKey(),

        name: varchar('name', { length: 255 }).notNull(),
    },
    extraConfig: table => ({}),
});
