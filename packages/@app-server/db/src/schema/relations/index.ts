import { ActivityRelations } from './Activity';
import { ActivityCategoryRelations } from './ActivityCategory';
import { ActivityConversationRelations } from './ActivityConversation';
import { ActivityReviewRelations } from './ActivityReview';
import { ConversationRelations } from './Conversation';
import { ConversationCallRelations } from './ConversationCall';
import { ConversationMessageRelations } from './ConversationMessage';
import { EntryRelations } from './Entry';
import { ProjectRelations } from './Project';
import { ReviewRelations } from './Review';

/**
 * @const relations
 * @description Map of all table relations
 */
export const relations = {
    ActivityRelations,
    ActivityCategoryRelations,
    ActivityConversationRelations,
    ActivityReviewRelations,
    ConversationCallRelations,
    ConversationRelations,
    ConversationMessageRelations,
    ReviewRelations,
    EntryRelations,
    ProjectRelations,
};
