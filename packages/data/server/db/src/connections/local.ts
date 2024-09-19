import { PORTS } from '@acme/paths/ports.js';
import type { Config as DrizzleConfig } from 'drizzle-kit';
import { drizzle, type MySql2Database } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { schema } from '../schema';

/**
 * @interface ILocalMySqlClient
 * @description Database client interface
 */
export type ILocalMySqlClient = MySql2Database<typeof schema>;

/**
 * @var MYSQL2_CLIENT
 * @description Lazy-init PlanetScale client
 */
let MYSQL2_CLIENT: ILocalMySqlClient | null = null;

/**
 * @function getLocalMySql2Client
 * @description Connect to the local MySQL database
 */
export async function getLocalMySql2Client() {
    if (MYSQL2_CLIENT) return MYSQL2_CLIENT;

    const connection = await mysql.createConnection(getLocalDbCredentials());
    const db = drizzle(connection, { mode: 'planetscale', schema: schema });

    MYSQL2_CLIENT = db;

    return db;
}

/**
 * @function getLocalDbCredentials
 * @description Get the DB credentials for the local MySQL instance
 */
export function getLocalDbCredentials() {
    return {
        host: 'localhost',
        port: PORTS.mysql,
        user: 'myuser',
        password: 'mypassword',
        database: 'mydb',
    } satisfies Extract<DrizzleConfig, { dialect: 'mysql' }>['dbCredentials'];
}
