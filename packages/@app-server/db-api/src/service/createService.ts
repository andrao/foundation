import { createInsertSchema, t } from '@acme/db';
import type { z } from 'zod';
import type { IDbApiContext } from '../types';

const INPUT_SCHEMA = createInsertSchema(t.Service);

/**
 * @function createService
 * @description Create a Service entity
 */
export async function createService(
    input: z.infer<typeof INPUT_SCHEMA> & {
        embedding?: Array<number>;
    },
    ctx: Pick<IDbApiContext, 'dbx'>,
) {
    // /**
    //  * Validate
    //  */
    // if (!input.user_id) throw new TRPCError({ code: 'UNAUTHORIZED', cause: 'No user_id' });

    /**
     * Save
     */
    await ctx.dbx(db => db.insert(t.Service).values(input));

    /**
     * @todo Publish event
     */
}
