import { relations } from 'drizzle-orm';
import { ActivityConversation } from '../tables/Activity/ActivityConversation';
import { Conversation } from '../tables/Conversation/Conversation';
import { ConversationCall } from '../tables/Conversation/ConversationCall';
import { ConversationMessage } from '../tables/Conversation/ConversationMessage';

/**
 * @const ConversationRelations
 * @description Relations for the conversation table
 */
export const ConversationRelations = relations(Conversation, ({ many }) => ({
    activities: many(ActivityConversation, {
        relationName: `ActivityConversations`,
    }),

    calls: many(ConversationCall, { relationName: `ConversationCalls` }),
    messages: many(ConversationMessage, { relationName: `ConversationMessages` }),
}));
