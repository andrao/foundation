import { relations } from 'drizzle-orm';
import { ActivityReview } from '../tables/Activity/ActivityReview';
import { Review } from '../tables/Review';

/**
 * @const ReviewRelations
 * @description Relations for the review table
 */
export const ReviewRelations = relations(Review, ({ many }) => ({
    activities: many(ActivityReview, {
        relationName: `ActivityReviews`,
    }),
}));
