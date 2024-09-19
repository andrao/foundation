import { bigint, index, text, varchar } from 'drizzle-orm/mysql-core';
import { createTable } from '../common/createTable';

/**
 * @const Service
 * @description The Service table
 */
export const Service = createTable({
    name: 'service',
    columns: {
        service_id: bigint('service_id', { mode: 'number', unsigned: true })
            .autoincrement()
            .primaryKey(),

        merchant_id: bigint('merchant_id', { mode: 'number', unsigned: true }).notNull(),

        name: varchar('name', { length: 255 }).notNull(),
        description: text('description'),
    },
    extraConfig: table => ({
        // Foreign keys
        idx_merchant_id: index('idx_merchant_id').on(table.merchant_id),
    }),
});
