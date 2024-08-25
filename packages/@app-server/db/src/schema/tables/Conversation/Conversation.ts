import { integer, varchar } from 'drizzle-orm/pg-core';
import { createTable } from '../../common/createTable';

/**
 * @const Conversation
 * @description The Conversation table
 */
export const Conversation = createTable({
    name: 'conversation',
    columns: {
        conversation_id: varchar('conversation_id').primaryKey(),
        content: varchar('content').notNull(),

        missed_calls: integer('missed_calls').default(0),
    },
});

export type IConversation = typeof Conversation.$inferSelect;
