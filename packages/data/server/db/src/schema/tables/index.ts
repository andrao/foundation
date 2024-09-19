import type { MySqlTableWithColumns } from 'drizzle-orm/mysql-core';
import { Merchant } from './Merchant';
import { Service } from './Service';

/**
 * @const tables
 * @description Database table map
 */
export const tables = {
    Merchant,
    Service,
};

/**
 * @namespace T
 * @description Database table type map
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace T {
    export type Merchant = typeof Merchant.$inferSelect;
    export type MerchantSelection = ToSelection<typeof Merchant>;
    export type Service = typeof Service.$inferSelect;
    export type ServiceSelection = ToSelection<typeof Service>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ToSelection<E extends MySqlTableWithColumns<any>> = {
    [K in keyof E['_']['columns']]?: boolean;
};
