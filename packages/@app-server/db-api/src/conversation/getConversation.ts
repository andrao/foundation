import { TRPCError } from '@trpc/server';
import type { IDbApiContext } from '../types';

/**
 * @function getConversation
 * @description Get populated first Conversation entity
 */
export async function getConversation({ ctx }: { ctx: Pick<IDbApiContext, 'dbx'> }) {
    const e = await ctx.dbx(db =>
        db.query.Conversation.findFirst({
            with: {
                calls: true,
                // messages: true,
                activities: {
                    with: {
                        activity: {
                            columns: { activity_id: true, approval: true, status: true },
                        },
                    },
                },
            },
        }),
    );

    if (!e) throw new TRPCError({ code: 'NOT_FOUND' });

    const mod = {
        ...e,
        activities: e.activities.map(a => a.activity),
    };

    return e;
}
