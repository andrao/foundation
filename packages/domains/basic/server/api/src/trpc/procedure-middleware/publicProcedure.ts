import { t } from '../instance';
import type { ExtractContext } from './types';

/**
 * @interface IPublicProcedureContext
 * @description Context available to public procedures
 */
export type IPublicProcedureContext = ExtractContext<typeof basePublicProcedure>;

/**
 * @const basePublicProcedure
 * @description For procedures run by public application
 */
const basePublicProcedure = t.procedure.use(({ ctx, next }) => {
    return next({ ctx });
});

/**
 * @function publicProcedure
 * @description For procedures run by public application
 * @todo {boolean} authorize_origin Whether to authorize request origin
 */
export function publicProcedure() {
    return basePublicProcedure;
}
