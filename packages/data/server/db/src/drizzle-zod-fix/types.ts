/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Assume, Column, Equal, Simplify, Table } from 'drizzle-orm';
import type { z } from 'zod';

declare const literalSchema: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>;
type Literal = z.infer<typeof literalSchema>;
type Json =
    | Literal
    | {
          [key: string]: Json;
      }
    | Array<Json>;

type MapInsertColumnToZod<
    TColumn extends Column,
    TType extends z.ZodTypeAny,
> = TColumn['_']['notNull'] extends false
    ? z.ZodOptional<z.ZodNullable<TType>>
    : TColumn['_']['hasDefault'] extends true
      ? z.ZodOptional<TType>
      : TType;
type MapSelectColumnToZod<
    TColumn extends Column,
    TType extends z.ZodTypeAny,
> = TColumn['_']['notNull'] extends false ? z.ZodNullable<TType> : TType;
type MapColumnToZod<
    TColumn extends Column,
    TType extends z.ZodTypeAny,
    TMode extends 'insert' | 'select',
> = TMode extends 'insert'
    ? MapInsertColumnToZod<TColumn, TType>
    : MapSelectColumnToZod<TColumn, TType>;
type MaybeOptional<
    TColumn extends Column,
    TType extends z.ZodTypeAny,
    TMode extends 'insert' | 'select',
    TNoOptional extends boolean,
> = TNoOptional extends true ? TType : MapColumnToZod<TColumn, TType, TMode>;

type GetZodType<TColumn extends Column> =
    TColumn extends Column<infer T, infer C>
        ? T['dataType'] extends 'custom'
            ? // T['name'] extends 'point'
              // ? z.ZodType<IPoint>
              // :
              z.ZodAny
            : T['dataType'] extends 'array'
              ? z.ZodArray<
                    GetZodType<
                        Assume<
                            TColumn['_'],
                            {
                                baseColumn: Column;
                            }
                        >['baseColumn']
                    >
                >
              : T['dataType'] extends 'json'
                ? z.ZodType<Json>
                : TColumn extends {
                        enumValues: [string, ...Array<string>];
                    }
                  ? Equal<TColumn['enumValues'], [string, ...Array<string>]> extends true
                      ? z.ZodString
                      : z.ZodEnum<TColumn['enumValues']>
                  : T['dataType'] extends 'bigint'
                    ? z.ZodBigInt
                    : T['dataType'] extends 'number'
                      ? z.ZodNumber
                      : T['dataType'] extends 'string'
                        ? z.ZodString
                        : T['dataType'] extends 'boolean'
                          ? z.ZodBoolean
                          : T['dataType'] extends 'date'
                            ? z.ZodDate
                            : z.ZodAny
        : never;
type ValueOrUpdater<T, TUpdaterArg> = T | ((arg: TUpdaterArg) => T);
type UnwrapValueOrUpdater<T> = T extends ValueOrUpdater<infer U, any> ? U : never;
export type Refine<TTable extends Table, TMode extends 'select' | 'insert'> = {
    [K in keyof TTable['_']['columns']]?: ValueOrUpdater<
        z.ZodTypeAny,
        TMode extends 'select'
            ? BuildSelectSchema<TTable, {}, true>
            : BuildInsertSchema<TTable, {}, true>
    >;
};
export type BuildInsertSchema<
    TTable extends Table,
    TRefine extends Refine<TTable, 'insert'> | {},
    TNoOptional extends boolean = false,
> = TTable['_']['columns'] extends infer TColumns extends Record<string, Column<any>>
    ? {
          [K in keyof TColumns & string]: MaybeOptional<
              TColumns[K],
              K extends keyof TRefine
                  ? Assume<UnwrapValueOrUpdater<TRefine[K]>, z.ZodTypeAny>
                  : GetZodType<TColumns[K]>,
              'insert',
              TNoOptional
          >;
      }
    : never;
export type BuildSelectSchema<
    TTable extends Table,
    TRefine extends Refine<TTable, 'select'>,
    TNoOptional extends boolean = false,
> = Simplify<{
    [K in keyof TTable['_']['columns']]: MaybeOptional<
        TTable['_']['columns'][K],
        K extends keyof TRefine
            ? Assume<UnwrapValueOrUpdater<TRefine[K]>, z.ZodTypeAny>
            : GetZodType<TTable['_']['columns'][K]>,
        'select',
        TNoOptional
    >;
}>;
