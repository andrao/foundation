import { neon, type NeonQueryFunction } from '@neondatabase/serverless';
import { drizzle, type NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { schema } from '../schema';
import { getConnectionUri } from '../util/getConnectionUri';

/**
 * @interface INeonServerlessClient
 * @description Database client interface
 */
export type INeonServerlessClient = NeonHttpDatabase<typeof schema>;

/**
 * @const connection
 * @description Establish connection to the database
 */

/**
 * @var NEON_CLIENT
 * @description Lazy-init Neon client
 */
let NEON_CLIENT: INeonServerlessClient | null = null;

/**
 * @function getNeonServerlessClient
 * @description Get the Neon serverless database client
 * - Only init once
 */
export function getNeonServerlessClient(variant: 'USER' | 'MIGRATION' = 'USER') {
    if (NEON_CLIENT) return NEON_CLIENT;

    const connection = neon(getConnectionUri(variant));
    const db = drizzle(connection as NeonQueryFunction<boolean, boolean>, { schema });

    NEON_CLIENT = db;

    return db;
}
