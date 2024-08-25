import { varchar } from 'drizzle-orm/pg-core';
import { createTable } from '../../common/createTable';
import { Activity } from './Activity';

/**
 * @const ActivityCategory
 * @description The ActivityCategory table
 */
export const ActivityCategory = createTable({
    name: 'activity_category',
    columns: {
        // @note that we cannot have more than one category, since we're using the activity_id as the primary key
        activity_id: varchar('activity_id').references(() => Activity.activity_id),

        category_id: varchar('category_id').notNull(),
        // .references(() => Category.category),
    },
});

export type IActivityCategory = typeof ActivityCategory.$inferSelect;
