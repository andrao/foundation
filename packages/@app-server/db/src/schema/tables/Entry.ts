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

        org_id: varchar('org_id', { length: 36 }),
        user_id: varchar('user_id', { length: 36 }),
    },
    extraConfig: table => ({
        idx_org_id: index('idx_org_id').on(table.org_id),
        idx_user_id: index('idx_user_id').on(table.user_id),

        // Foreign keys
        idx_project_id: index('idx_project_id').on(table.project_id),
    }),
});
