import { relations } from 'drizzle-orm';
import { Entry } from '../tables/Entry';
import { Project } from '../tables/Project';

/**
 * @const EntryRelations
 * @description Relations for the entry table
 */
export const EntryRelations = relations(Entry, ({ one }) => ({
    project: one(Project, {
        fields: [Entry.project_id],
        references: [Project.project_id],
        relationName: `ProjectEntries`,
    }),
}));
