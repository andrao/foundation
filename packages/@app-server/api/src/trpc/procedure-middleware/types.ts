import type { ProcedureBuilder } from '@trpc/server/unstable-core-do-not-import';

/**
 * @interface ExtractContext
 * @description Utility type to extract context override from a procedure builder
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ExtractContext<T extends ProcedureBuilder<any, any, any, any, any, any, any, any>> =
    T extends ProcedureBuilder<
        infer A,
        infer B,
        infer ContextOverrides,
        infer D,
        infer E,
        infer F,
        infer G,
        infer H
    >
        ? ContextOverrides
        : never;
