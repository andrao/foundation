import { varchar } from 'drizzle-orm/pg-core';
import { createTable } from '../common/createTable';

/**
 * @const Review
 * @description The Review table
 */
export const Review = createTable({
    name: 'review',
    columns: {
        review_id: varchar('review_id').primaryKey(),
        content: varchar('content').notNull(),
    },
});

export type IReview = typeof Review.$inferSelect;
