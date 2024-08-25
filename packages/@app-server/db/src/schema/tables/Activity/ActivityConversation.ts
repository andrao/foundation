import { pgEnum, timestamp, varchar } from 'drizzle-orm/pg-core';
import { createTable } from '../../common/createTable';
import { Conversation } from '../Conversation/Conversation';
import { Activity } from './Activity';

// ----------------------------------------------

interface TActivityConversation {
    /**
     * call_ids:
     *
     * @note that Calls are associated directly with Conversations, not with ActivityConversations
     * - Conversations are a standalone entity, that can be considered within or without the context of an Activity
     *   - i.e. why should they be nested under activities, per se?
     */
    call_ids: Array<string>;

    conversation_id: string;
    message_ids: Array<string>;
    readtime?: string;
    type: 'conversation'; // Activity.Type.CONVERSATION;

    /**
     * Omitted
     */
    stats: {
        missed_calls: number;
        unread_messages: number;
    };
}

// ----------------------------------------------

export const ActivityConversationType = pgEnum('ActivityConversationType', ['conversation']);

/**
 * @const ActivityConversation
 * @description The ActivityConversation table
 */
export const ActivityConversation = createTable({
    name: `activity_conversation`,
    columns: {
        // @note attaches to single activity, since we're using the activity_id as the primary key
        activity_id: varchar('activity_id')
            .primaryKey()
            .references(() => Activity.activity_id),

        conversation_id: varchar('conversation_id')
            .notNull()
            .references(() => Conversation.conversation_id),

        readtime: timestamp('date'),

        // @note: redundant if related though table
        type: ActivityConversationType('type').notNull().default('conversation'),
    },
});

export type IActivityConversation = typeof ActivityConversation.$inferSelect;
