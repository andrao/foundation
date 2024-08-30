import { sql, type BuildColumns } from 'drizzle-orm';
import {
    mysqlTableCreator,
    timestamp,
    type MySqlColumnBuilderBase,
    type MySqlTableExtraConfig,
    type MySqlTableWithColumns,
} from 'drizzle-orm/mysql-core';

/**
 * Prefix table names
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
const nameTable = mysqlTableCreator(name => name);

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
        .$onUpdate(() => sql`CURRENT_TIMESTAMP`)
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
    ColumnsMap extends Record<string, MySqlColumnBuilderBase>,
>({
    name,
    columns,
    extraConfig,
}: {
    name: TableName;
    columns: ColumnsMap;
    extraConfig?: (
        self: BuildColumns<TableName, ColumnsMap & typeof DEFAULT_COLUMNS, 'mysql'>,
    ) => MySqlTableExtraConfig;
}): MySqlTableWithColumns<{
    name: TableName;
    schema: undefined;
    columns: BuildColumns<TableName, ColumnsMap & typeof DEFAULT_COLUMNS, 'mysql'>;
    dialect: 'mysql';
}> {
    return nameTable(name, { ...DEFAULT_COLUMNS, ...columns }, extraConfig);
}
