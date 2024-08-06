import { index, pgEnum, varchar } from 'drizzle-orm/pg-core';
import { createTable } from '../common/createTable';
import { Project } from './Project';

/**
 * @const EntryStatus
 * @description The processing status of an Entry
 */
export const EntryStatus = pgEnum('EntryStatus', [
    /** @note that order is important! */
    'unprocessed',
    'processed',
]);

/**
 * @const Entry
 * @description The Entry table
 */
export const Entry = createTable({
    name: 'entry',
    columns: {
        entry_id: varchar('entry_id').primaryKey(),

        project_id: varchar('project_id')
            .notNull()
            .references(() => Project.project_id, {
                onDelete: 'set null',
            }),
        status: EntryStatus('status').notNull().default('unprocessed'),

        org_id: varchar('org_id'),
        user_id: varchar('user_id'),
    },
    extraConfig: table => ({
        org_idx: index('org_idx').on(table.org_id),
        user_idx: index('user_idx').on(table.user_id),
    }),
});
