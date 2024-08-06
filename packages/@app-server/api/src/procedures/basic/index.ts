import { createTRPCRouter } from '../../trpc/procedure-middleware';
import { getProtectedMessage } from './getProtectedMessage';

/**
 * @const BASIC_ROUTER
 * @description tRPC router for basic procedure testing
 */
export const BASIC_ROUTER = createTRPCRouter({
    getProtectedMessage,
});
