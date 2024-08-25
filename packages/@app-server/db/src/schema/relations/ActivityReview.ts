import { relations } from 'drizzle-orm';
import { Activity } from '../tables/Activity/Activity';
import { ActivityReview } from '../tables/Activity/ActivityReview';
import { Review } from '../tables/Review';

/**
 * @const ActivityReviewRelations
 * @description Relations for the activity_review table
 */
export const ActivityReviewRelations = relations(ActivityReview, ({ one }) => ({
    activity: one(Activity, {
        fields: [ActivityReview.activity_id],
        references: [Activity.activity_id],
    }),

    review: one(Review, {
        fields: [ActivityReview.review_id],
        references: [Review.review_id],
        relationName: `ActivityReviews`,
    }),
}));
