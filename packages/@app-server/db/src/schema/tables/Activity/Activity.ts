import { boolean, pgEnum, timestamp, varchar } from 'drizzle-orm/pg-core';
import { createTable } from '../../common/createTable';

// --------------------------------------------------------------

interface ActivityBase {
    /**
     * Handled
     */
    activity_id: string;
    approval: string; // Activity.ApprovalStatus;
    assignee: { account_id: string; date: string } | null;
    categories: Array<string>; // Array<Activity.Category>;
    created: { at: string };
    date: string;

    is_hidden?: boolean;
    merchant_id: string;
    status: string; //Activity.Status;
    type: string; //Activity.Type;

    /**
     * Omitted
     */
    archived: { account_id: string; date: string } | null;
    dismissed_by: Record<string, string>;
    read_by: Record<string, string>;
}

// --------------------------------------------------------------

export const ActivityApprovalStatus = pgEnum('ActivityApprovalStatus', [
    'pending',
    'approved',
    'rejected',
    'not_required',
]);

export const ActivityStatus = pgEnum('ActivityStatus', ['processing', 'inbox', 'archive']);

/**
 * @const Activity
 * @description The Activity table
 */
export const Activity = createTable({
    name: `activity`,
    columns: {
        activity_id: varchar('activity_id').primaryKey(),

        // @show default typing
        approval: ActivityApprovalStatus('approval').notNull().default('pending'),
        date: timestamp('date').notNull(),
        is_hidden: boolean('is_hidden').default(false),
        merchant_id: varchar('merchant_id').notNull(),

        status: ActivityStatus('status').notNull().default('processing'),
    },
});

export type IActivity = typeof Activity.$inferSelect;
