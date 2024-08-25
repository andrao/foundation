import { varchar } from 'drizzle-orm/pg-core';
import { createTable } from '../../common/createTable';
import { Activity } from './Activity';

/**
 * @const ActivityAssignee
 * @description The ActivityAssignee table
 */
export const ActivityAssignee = createTable({
    name: 'activity_assignee',
    columns: {
        // @note that we cannot have more than one assignee, since we're using the activity_id as the primary key
        activity_id: varchar('activity_id')
            .primaryKey()
            .references(() => Activity.activity_id),

        assignee_id: varchar('assignee_id').notNull(),
        // .references(() => User.user_id),
    },
});

export type IActivityAssignee = typeof ActivityAssignee.$inferSelect;
