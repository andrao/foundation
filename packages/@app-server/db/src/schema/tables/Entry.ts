import { index, mysqlEnum, varchar } from 'drizzle-orm/mysql-core';
import { createTable } from '../common/createTable';

/**
 * @const Entry
 * @description The Entry table
 */
export const Entry = createTable({
    name: 'entry',
    columns: {
        entry_id: varchar('entry_id', { length: 36 }).primaryKey(),

        project_id: varchar('project_id', { length: 36 }).notNull(),
        status: mysqlEnum('status', ['unprocessed', 'processed']).notNull().default('unprocessed'),
    },
    extraConfig: table => ({
        // Foreign keys
        idx_project_id: index('idx_project_id').on(table.project_id),
    }),
});
