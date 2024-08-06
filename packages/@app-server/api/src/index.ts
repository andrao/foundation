import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import type { IAppRouter } from './procedures';

/**
 * Forward exports
 */
export { APP_ROUTER, type IAppRouter } from './procedures';
export * from './trpc/context';
export { createCallerFactory } from './trpc/instance';

/**
 * Inference helpers for input types
 * @example type HelloInput = RouterInputs['example']['hello']
 **/
export type RouterInputs = inferRouterInputs<IAppRouter>;

/**
 * Inference helpers for output types
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type RouterOutputs = inferRouterOutputs<IAppRouter>;
