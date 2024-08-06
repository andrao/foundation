import { sql, type AnyColumn, type SQLWrapper } from 'drizzle-orm';
import { customType } from 'drizzle-orm/pg-core';

/**
 * @const vectorType
 * @description Custom Postgres type for pgvector vector
 * @see https://github.com/useverk/drizzle-pgvector
 */
export const vectorType = customType<{
    data: Array<number>;
    driverData: string;
    config: { dimensions: number };
}>({
    dataType(config) {
        if (!config?.dimensions) throw new Error(`Must specify dimensions when using vectorType`);

        return `vector(${config.dimensions})`;
    },

    toDriver(value: Array<number>): string {
        return toSql(value);
    },

    fromDriver(value) {
        return fromSql(value);
    },
});

/**
 * @function fromSql
 * @description Convert from driver format to JS array
 */
function fromSql(value: string): Array<number> {
    return value
        .substring(1, value.length - 1)
        .split(',')
        .map(v => parseFloat(v));
}

/**
 * @function toSql
 * @description Convert from JS array to driver format
 */
function toSql(value: Array<number>): string {
    return JSON.stringify(value);
}

/**
 * @function cosineSimilarity
 * @description Calculate the cosine distance between two vectors
 * @comment PREFERRED over Euclidean for semantic similarity, since it's more robust to varying text length
 */
export function cosineSimilarity(column: SQLWrapper | AnyColumn, value: Array<number>) {
    return sql<number>`${column} <=> ${toSql(value)}`;
}

/**
 * @function euclideanDistance
 * @description Calculate the Euclidean (L2) distance between two vectors
 * @comment Prefer cosineSimilarity
 */
export function euclideanDistance(column: SQLWrapper | AnyColumn, value: Array<number>) {
    return sql<number>`${column} <-> ${toSql(value)}`;
}

/**
 * @function maxInnerProduct
 * @description Calculate the inner product (dot product) between two vectors
 */
export function maxInnerProduct(column: SQLWrapper | AnyColumn, value: Array<number>) {
    return sql<number>`${column} <#> ${toSql(value)}`;
}
