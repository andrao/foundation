import { type BuildColumns, type BuildExtraConfigColumns } from 'drizzle-orm';
import {
    varchar,
    type PgColumnBuilderBase,
    type PgTableExtraConfig,
    type PgTableWithColumns,
} from 'drizzle-orm/pg-core';
import { createTable, type DEFAULT_COLUMNS } from '../../../common/createTable';
import { Activity, ActivityColumns } from '../Activity';

/**
 * @function constructActivitySubtypeTable
 * @description Construct an activity subtype
 */
export function constructActivitySubtypeTable<
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
        self: BuildExtraConfigColumns<
            TableName,
            ColumnsMap & typeof ActivityColumns & typeof DEFAULT_COLUMNS,
            'pg'
        >,
    ) => PgTableExtraConfig;
}): PgTableWithColumns<{
    name: TableName;
    schema: undefined;
    columns: BuildColumns<
        TableName,
        ColumnsMap & typeof ActivityColumns & typeof DEFAULT_COLUMNS,
        'pg'
    >;
    dialect: 'pg';
}> {
    return createTable({
        name,
        columns: {
            ...ActivityColumns,

            // Overwrite activity_id with table reference
            activity_id: varchar('activity_id')
                .primaryKey()
                .references(() => Activity.activity_id),

            ...columns,
        },
        extraConfig,
    });
}
