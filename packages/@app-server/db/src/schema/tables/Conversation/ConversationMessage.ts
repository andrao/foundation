import { varchar } from 'drizzle-orm/pg-core';
import { createTable } from '../../common/createTable';
import { Conversation } from './Conversation';

/**
 * @const ConversationMessage
 * @description The ConversationMessage table
 */
export const ConversationMessage = createTable({
    name: 'conversation_message',
    columns: {
        conversation_message_id: varchar('conversation_message_id').primaryKey(),
        content: varchar('content').notNull(),

        conversation_id: varchar('conversation_id')
            .notNull()
            .references(() => Conversation.conversation_id),
    },
});

export type IConversationMessage = typeof ConversationMessage.$inferSelect;
