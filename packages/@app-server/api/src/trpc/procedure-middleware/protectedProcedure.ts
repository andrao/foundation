import { TRPCError } from '@trpc/server';
import { t } from '../instance';
import type { ExtractContext } from './types';

/**
 * @interface IProtectedProcedureContext
 * @description Context available to protected procedures
 */
export type IProtectedProcedureContext = ExtractContext<typeof baseProtectedProcedure>;

/**
 * @const baseProtectedProcedure
 * @description User must be logged in to access this procedure
 */
const baseProtectedProcedure = t.procedure.use(({ ctx, next }) => {
    /** @tmp @todo */
    if (!ctx.headers[`x-auth`]) throw new TRPCError({ code: 'UNAUTHORIZED' });

    return next({
        ctx: {
            ...ctx,
            // auth: ctx.auth
        },
    });
});

/**
 * @function protectedProcedure
 * @description User must be logged in to access this procedure
 * @todo {boolean} authorize_origin Whether to authorize request origin
 */
export function protectedProcedure() {
    return baseProtectedProcedure;
}
