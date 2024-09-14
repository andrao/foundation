import { Client } from '@planetscale/database';
import { drizzle as drizzleMysql } from 'drizzle-orm/mysql2';
import { drizzle, type PlanetScaleDatabase } from 'drizzle-orm/planetscale-serverless';
import mysql from 'mysql2/promise';
import { schema } from '../../schema';
import { getPlanetScaleConnectionParams, getPlanetScaleDbCredentials } from './params';

/**
 * @interface IPlanetScaleServerlessClient
 * @description Database client interface
 */
export type IPlanetScaleServerlessClient = PlanetScaleDatabase<typeof schema>;

/**
 * @var PLANETSCALE_CLIENT
 * @description Lazy-init PlanetScale client
 */
let PLANETSCALE_CLIENT: IPlanetScaleServerlessClient | null = null;

/**
 * @function getPlanetScaleServerlessClient
 * @description Get the PlanetScale serverless database client
 * - Only init once
 */
export function getPlanetScaleServerlessClient() {
    if (PLANETSCALE_CLIENT) return PLANETSCALE_CLIENT;

    const client = new Client(getPlanetScaleConnectionParams());
    const db = drizzle(client, { schema });

    PLANETSCALE_CLIENT = db;

    return db;
}

/**
 * @function getPlanetScaleMySqlClient
 * @description Get a MySQL client for the PlanetScale DB
 */
export async function getPlanetScaleMySqlClient() {
    const connection = await mysql.createConnection(getPlanetScaleDbCredentials());

    const db = drizzleMysql(connection);

    return { db, connection };
}
