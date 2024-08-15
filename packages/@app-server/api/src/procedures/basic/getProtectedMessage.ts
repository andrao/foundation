import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { protectedProcedure } from '../../trpc/procedure-middleware';

/**
 * @const getProtectedMessage
 * @description Return a message to an authenticated user
 */
export const getProtectedMessage = protectedProcedure()
    .input(
        z
            .object({
                n: z.number().optional(),
            })
            .optional(),
    )
    .output(z.string())
    .query(({ input, ctx }) => {
        if (input?.n && input.n >= 10)
            throw new TRPCError({ code: 'TOO_MANY_REQUESTS', message: `That's enough!` });

        return `Welcome, this is the protected message – n=${input?.n ?? 0}`;
    });
