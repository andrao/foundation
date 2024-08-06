import { relations } from './relations';
import { tables } from './tables';

/**
 * @const schema
 * @alias t
 * @description The database schema
 */
export const schema = {
    // Relations
    ...relations,

    // Tables
    ...tables,
};
export const t = schema;
