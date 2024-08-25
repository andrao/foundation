import { relations } from 'drizzle-orm';
import { Activity } from '../tables/Activity/Activity';
import { ActivityConversation } from '../tables/Activity/ActivityConversation';
import { Conversation } from '../tables/Conversation/Conversation';

/**
 * @const ActivityConversationRelations
 * @description Relations for the activity_conversation table
 */
export const ActivityConversationRelations = relations(ActivityConversation, ({ one }) => ({
    activity: one(Activity, {
        fields: [ActivityConversation.activity_id],
        references: [Activity.activity_id],
    }),

    conversation: one(Conversation, {
        fields: [ActivityConversation.conversation_id],
        references: [Conversation.conversation_id],
        relationName: `ActivityConversations`,
    }),
}));
