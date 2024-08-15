import { createTRPCRouter } from '../../trpc/procedure-middleware';
import { createProjectProcedure } from './createProject';

/**
 * @const PROJECT_ROUTER
 * @description tRPC router for Project entities
 */
export const PROJECT_ROUTER = createTRPCRouter({
    createProject: createProjectProcedure,
});
