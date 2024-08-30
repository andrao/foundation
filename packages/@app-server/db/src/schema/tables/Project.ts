import { varchar } from 'drizzle-orm/mysql-core';
import { createTable } from '../common/createTable';

/**
 * @const Project
 * @description The Project table
 */
export const Project = createTable({
    name: 'project',
    columns: {
        project_id: varchar('project_id', { length: 36 }).primaryKey(),
        name: varchar('name', { length: 255 }).notNull(),

        org_id: varchar('org_id', { length: 36 }),
        user_id: varchar('user_id', { length: 36 }),
    },
});
