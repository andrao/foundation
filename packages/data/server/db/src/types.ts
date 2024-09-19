import type { PgColumn } from 'drizzle-orm/pg-core';

/**
 * @interface ExtractEnum
 * @description Extracts the enum values from a PgEnum
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ExtractEnum<E extends PgColumn<any>> =
    E extends PgColumn<infer T> ? T['enumValues'][Extract<keyof T['enumValues'], number>] : never;
