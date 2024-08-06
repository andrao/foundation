import { initTRPC } from '@trpc/server';
import { ZodError } from 'zod';
import type { createTRPCContext } from './context';
import { transformer } from './transformer';

/**
 * @const t
 * @description The tRPC instance
 * @see https://trpc.io/docs/server/routers
 * > "You should initialize tRPC exactly once per application. Multiple instances of tRPC will cause issues."
 */
export const t = initTRPC.context<typeof createTRPCContext>().create({
    transformer,
    errorFormatter: ({ shape, error }) => ({
        ...shape,
        data: {
            ...shape.data,
            zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
        },
    }),
});

/**
 * @const createCallerFactory
 * @description Create a server-side caller
 * @see https://trpc.io/docs/server/server-side-calls
 */
export const createCallerFactory = t.createCallerFactory;
