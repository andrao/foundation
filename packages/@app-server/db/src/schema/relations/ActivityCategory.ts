import { relations } from 'drizzle-orm';
import { Activity } from '../tables/Activity/Activity';
import { ActivityCategory } from '../tables/Activity/ActivityCategory';

/**
 * @const ActivityCategoryRelations
 * @description Relations for the activity_category table
 */
export const ActivityCategoryRelations = relations(ActivityCategory, ({ one }) => ({
    activity: one(Activity, {
        fields: [ActivityCategory.activity_id],
        references: [Activity.activity_id],
    }),

    // @todo category
}));
