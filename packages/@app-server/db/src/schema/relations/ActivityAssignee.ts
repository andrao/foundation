import { relations } from 'drizzle-orm';
import { Activity } from '../tables/Activity/Activity';
import { ActivityAssignee } from '../tables/Activity/ActivityAssignee';

/**
 * @const ActivityAssigneeRelations
 * @description Relations for the activity_assignee table
 */
export const ActivityAssigneeRelations = relations(ActivityAssignee, ({ one }) => ({
    activity: one(Activity, {
        fields: [ActivityAssignee.activity_id],
        references: [Activity.activity_id],
    }),

    // @todo user
}));
