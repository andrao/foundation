import { createInsertSchema, createSelectSchema, t } from '@acme/db';
import { createProject } from '@acme/db-api';
import { protectedProcedure } from '../../trpc/procedure-middleware';

/**
 * @const createProjectProcedure
 * @description Create a new Project entity
 */
export const createProjectProcedure = protectedProcedure()
    .input(createInsertSchema(t.Project))
    .output(createSelectSchema(t.Project))
    .mutation(async ({ input, ctx }) => {
        return await createProject(input, ctx);
    });
