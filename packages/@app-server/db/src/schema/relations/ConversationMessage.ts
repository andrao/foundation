import { relations } from 'drizzle-orm';
import { Conversation } from '../tables/Conversation/Conversation';
import { ConversationMessage } from '../tables/Conversation/ConversationMessage';

/**
 * @const ConversationMessageRelations
 * @description Relations for the message table
 */
export const ConversationMessageRelations = relations(ConversationMessage, ({ one }) => ({
    conversation: one(Conversation, {
        fields: [ConversationMessage.conversation_id],
        references: [Conversation.conversation_id],
        relationName: `ConversationMessages`,
    }),
}));
