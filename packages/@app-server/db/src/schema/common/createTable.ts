import { sql, type BuildColumns, type BuildExtraConfigColumns } from 'drizzle-orm';
import {
    pgTableCreator,
    timestamp,
    type PgColumnBuilderBase,
    type PgTableExtraConfig,
    type PgTableWithColumns,
} from 'drizzle-orm/pg-core';

/**
 * Prefix table names
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
const nameTable = pgTableCreator(name => name);

/**
 * @const DEFAULT_COLUMNS
 * @description Default columns for all tables
 */
const DEFAULT_COLUMNS = {
    created_at: timestamp('created_at')
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    updated_at: timestamp('updated_at')
        .default(sql`CURRENT_TIMESTAMP`)
        .defaultNow()
        .notNull(),
    deleted_at: timestamp('deleted_at'),
};

/**
 * @function createTable
 * @description Create a table with a given name and schema
 * @param extraConfig Use for indexes, checks, FKs, PKs, unique constraints
 */
export function createTable<
    TableName extends string,
    ColumnsMap extends Record<string, PgColumnBuilderBase>,
>({
    name,
    columns,
    extraConfig,
}: {
    name: TableName;
    columns: ColumnsMap;
    extraConfig?: (
        self: BuildExtraConfigColumns<TableName, ColumnsMap & typeof DEFAULT_COLUMNS, 'pg'>,
    ) => PgTableExtraConfig;
}): PgTableWithColumns<{
    name: TableName;
    schema: undefined;
    columns: BuildColumns<TableName, ColumnsMap & typeof DEFAULT_COLUMNS, 'pg'>;
    dialect: 'pg';
}> {
    return nameTable(name, { ...DEFAULT_COLUMNS, ...columns }, extraConfig);
}
