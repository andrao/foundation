import { relations } from 'drizzle-orm';
import { Activity } from '../tables/Activity/Activity';
import { ActivityAssignee } from '../tables/Activity/ActivityAssignee';
import { ActivityCategory } from '../tables/Activity/ActivityCategory';
import { ActivityConversation } from '../tables/Activity/ActivityConversation';
import { ActivityReview } from '../tables/Activity/ActivityReview';

/**
 * @const ActivityRelations
 * @description Relations for the activity table
 */
export const ActivityRelations = relations(Activity, ({ one, many }) => ({
    activity_conversation: one(ActivityConversation),
    activity_review: one(ActivityReview),

    assignee: one(ActivityAssignee),
    categories: many(ActivityCategory),
}));
