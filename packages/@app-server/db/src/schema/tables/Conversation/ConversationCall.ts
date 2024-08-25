import { varchar } from 'drizzle-orm/pg-core';
import { createTable } from '../../common/createTable';
import { Conversation } from './Conversation';

/**
 * @const ConversationCall
 * @description The ConversationCall table
 */
export const ConversationCall = createTable({
    name: 'conversation_call',
    columns: {
        conversation_call_id: varchar('conversation_call_id').primaryKey(),
        content: varchar('content').notNull(),

        conversation_id: varchar('conversation_id')
            .notNull()
            .references(() => Conversation.conversation_id),
    },
});

export type IConversationCall = typeof ConversationCall.$inferSelect;
