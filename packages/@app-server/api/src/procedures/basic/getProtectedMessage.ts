import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { protectedProcedure } from '../../trpc/procedure-middleware';

/**
 * @const getProtectedMessage
 * @description Return a message to an authenticated user
 */
export const getProtectedMessage = protectedProcedure()
    .output(z.string())
    .mutation(({ input, ctx }) => {
        const name = ctx.headers['x-name'];
        if (!name) throw new TRPCError({ code: 'UNAUTHORIZED' });

        return `Hello ${name}, this is the protected message.`;
    });
