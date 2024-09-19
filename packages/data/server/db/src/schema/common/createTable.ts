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
    return nameTable(name, reorderColumns(columns), extraConfig);
}

/**
 * @comment I've experienced a bug when using MySQL $returningId when the DEFAULT_COLUMNS are spread before the input columns.
 *          The response should contain { [primary_key]: $id }, but instead contains { [first_column_defined]: $id }, paying
 *          no heed to which column is actually the primary key.
 * @description This function places the primary key column(s) first in the object
 */
function reorderColumns<ColumnsMap extends Record<string, MySqlColumnBuilderBase>>(
    columns: ColumnsMap,
) {
    const cols = { ...DEFAULT_COLUMNS, ...columns };
    const empty = {} as ColumnsMap & typeof DEFAULT_COLUMNS;

    return Object.entries(cols)
        .sort((ia, ib) => {
            const a = ia[1] as unknown as { config: { primaryKey: boolean } };
            const b = ib[1] as unknown as { config: { primaryKey: boolean } };

            if (a.config.primaryKey) return -1;
            if (b.config.primaryKey) return 1;

            return 0;
        })
        .reduce<ColumnsMap & typeof DEFAULT_COLUMNS>(
            (acc, item) => ({ ...acc, [item[0]]: item[1] }),
            empty,
        );
}
