import { check, index, varchar } from 'drizzle-orm/pg-core';
import { createTable } from '../common/createTable';

/**
 * @const Project
 * @description The Project table
 */
export const Project = createTable({
    name: 'project',
    columns: {
        project_id: varchar('project_id').primaryKey(),
        name: varchar('name').notNull(),

        org_id: varchar('org_id'),
        user_id: varchar('user_id'),
    },
    extraConfig: table => ({
        project_org_idx: index('project_org_idx').on(table.org_id),
        project_user_idx: index('project_user_idx').on(table.user_id),

        // dd: check('dd', `...`),
    }),
});
