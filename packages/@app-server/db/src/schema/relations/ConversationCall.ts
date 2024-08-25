import { relations } from 'drizzle-orm';
import { Conversation } from '../tables/Conversation/Conversation';
import { ConversationCall } from '../tables/Conversation/ConversationCall';

/**
 * @const ConversationCallRelations
 * @description Relations for the call table
 */
export const ConversationCallRelations = relations(ConversationCall, ({ one }) => ({
    conversation: one(Conversation, {
        fields: [ConversationCall.conversation_id],
        references: [Conversation.conversation_id],
        relationName: `ConversationCalls`,
    }),
}));
