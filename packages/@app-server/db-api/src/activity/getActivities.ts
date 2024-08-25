import type { IDbApiContext } from '../types';

/**
 * @function getActivities
 * @description Get populated Activity entities
 */
export async function getActivities({ ctx }: { ctx: Pick<IDbApiContext, 'dbx'> }) {
    const rows = await ctx.dbx(db =>
        db.query.Activity.findMany({
            with: {
                assignee: true,
                categories: true,

                activity_conversation: {
                    with: { conversation: { with: { messages: true, calls: true } } },
                },
                activity_review: { with: { review: true } },
            },
        }),
    );

    return rows;
}

/**
 * @function getActivities
 * @description Get populated Activity entities
 */
export async function getActivitiesSubset({ ctx }: { ctx: Pick<IDbApiContext, 'dbx'> }) {
    const rows = await ctx.dbx(db =>
        db.query.Activity.findMany({
            columns: { activity_id: true },
            with: {
                assignee: { columns: { assignee_id: true } },
                categories: { columns: { category_id: true } },

                activity_conversation: {
                    with: {
                        conversation: {
                            columns: { created_at: true, content: true },
                            with: { messages: true, calls: true },
                        },
                    },
                },
                activity_review: { with: { review: true } },
            },
        }),
    );

    const r = rows.map(e => e.activity_conversation?.conversation || e.activity_review?.review);

    return rows;
}
