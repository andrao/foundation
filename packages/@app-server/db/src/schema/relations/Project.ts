import { relations } from 'drizzle-orm';
import { Entry } from '../tables/Entry';
import { Project } from '../tables/Project';

/**
 * @const ProjectRelations
 * @description Relations for the project table
 */
export const ProjectRelations = relations(Project, ({ many }) => ({
    entries: many(Entry, { relationName: `ProjectEntries` }),
}));
