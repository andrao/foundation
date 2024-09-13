import { createInsertSchema, t } from '@acme/db';
import type { z } from 'zod';
import type { IDbApiContext } from '../types';

const INPUT_SCHEMA = createInsertSchema(t.Merchant);

/**
 * @function createMerchant
 * @description Create a Merchant entity
 */
export async function createMerchant(
    input: z.infer<typeof INPUT_SCHEMA>,
    ctx: Pick<IDbApiContext, 'dbx'>,
) {
    await ctx.dbx(db => db.insert(t.Merchant).values(input));

    /**
     * @todo Publish event
     */
}
