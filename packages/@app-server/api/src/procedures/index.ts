import { createTRPCRouter } from '../trpc/procedure-middleware';
import { BASIC_ROUTER } from './basic';
import { PROJECT_ROUTER } from './project';

/**
 * @const APP_ROUTER
 * @description tRPC API router
 */
export const APP_ROUTER = createTRPCRouter({
    basic: BASIC_ROUTER,
    project: PROJECT_ROUTER,
});

/**
 * @interface IAppRouter
 * @description API typing
 */
export type IAppRouter = typeof APP_ROUTER;
