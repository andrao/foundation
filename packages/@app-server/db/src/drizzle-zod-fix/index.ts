/* eslint-disable @typescript-eslint/no-empty-object-type */

import type { DrizzleTypeError, Equal, Table } from 'drizzle-orm';
import {
    createInsertSchema as _createInsertSchema,
    createSelectSchema as _createSelectSchema,
} from 'drizzle-zod';
import type { z } from 'zod';
import type { BuildInsertSchema, BuildSelectSchema, Refine } from './types';

export function createInsertSchema<
    TTable extends Table,
    TRefine extends Refine<TTable, 'insert'> = Refine<TTable, 'insert'>,
>(
    table: TTable,
    /**
     * @param refine Refine schema fields
     */
    refine?: {
        [K in keyof TRefine]: K extends keyof TTable['_']['columns']
            ? TRefine[K]
            : DrizzleTypeError<`Column '${K &
                  string}' does not exist in table '${TTable['_']['name']}'`>;
    },
): z.ZodObject<
    BuildInsertSchema<TTable, Equal<TRefine, Refine<TTable, 'insert'>> extends true ? {} : TRefine>
> {
    // @ts-expect-error: Type error in drizzle-zod has screwed up type inference
    return _createInsertSchema(table, refine);
}

export function createSelectSchema<
    TTable extends Table,
    TRefine extends Refine<TTable, 'select'> = Refine<TTable, 'select'>,
>(
    table: TTable,
    /**
     * @param refine Refine schema fields
     */
    refine?: {
        [K in keyof TRefine]: K extends keyof TTable['_']['columns']
            ? TRefine[K]
            : DrizzleTypeError<`Column '${K &
                  string}' does not exist in table '${TTable['_']['name']}'`>;
    },
): z.ZodObject<
    BuildSelectSchema<TTable, Equal<TRefine, Refine<TTable, 'select'>> extends true ? {} : TRefine>
> {
    // @ts-expect-error: Type error in drizzle-zod has screwed up type inference
    return _createSelectSchema(table, refine);
}
