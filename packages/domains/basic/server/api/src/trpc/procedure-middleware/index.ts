import { t } from '../instance';

export * from './publicProcedure';
export * from './protectedProcedure';

/**
 * @const createTRPCRouter
 * @description Function to create a new tRPC (sub)router
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;
