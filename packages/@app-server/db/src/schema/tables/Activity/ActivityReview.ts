import { pgEnum, varchar } from 'drizzle-orm/pg-core';
import { createTable } from '../../common/createTable';
import { Review } from '../Review';
import { Activity } from './Activity';

// --------------------------------------------------------------

interface ActivityReview {
    // extends ActivityBase {
    connected_account_id?: string;
    review_id: string;
    type: 'review'; // Activity.Type.REVIEW;
}

// --------------------------------------------------------------

export const ActivityReviewType = pgEnum('ActivityReviewType', ['review']);

/**
 * @const ActivityReview
 * @description The ActivityReview table
 */
export const ActivityReview = createTable({
    name: `activity_review`,
    columns: {
        // @note attaches to single activity, since we're using the activity_id as the primary key
        activity_id: varchar('activity_id')
            .primaryKey()
            .references(() => Activity.activity_id),

        review_id: varchar('review_id')
            .notNull()
            .references(() => Review.review_id),

        connected_account_id: varchar('connected_account_id'),
        // .references(() => Account.account_id),

        // @note: redundant if related though table
        type: ActivityReviewType('type').notNull().default('review'),
    },
});

export type IActivityReview = typeof ActivityReview.$inferSelect;
