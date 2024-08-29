import { DB_NAME } from '@acme/constants/planetscale';
import type { Config } from '@planetscale/database';
import type { Config as DrizzleConfig } from 'drizzle-kit';
import { env } from '../../../env.js';

/**
 * @function getPlanetScaleConnectionParams
 * @description Get the connection params for the PlanetScale database
 */
export function getPlanetScaleConnectionParams() {
    const url = env.PLANETSCALE_DATABASE_URL;

    return (
        url
            ? { url }
            : {
                  host: env.PLANETSCALE_HOST,
                  username: env.PLANETSCALE_USERNAME,
                  password: env.PLANETSCALE_PASSWORD,
              }
    ) satisfies Config;
}

/**
 * @function getPlanetScaleDbCredentials
 * @description Get the DB credentials for the PlanetScale database
 */
export function getPlanetScaleDbCredentials() {
    const url = env.PLANETSCALE_DATABASE_URL;

    return (
        url
            ? { url }
            : {
                  host: env.PLANETSCALE_HOST,
                  user: env.PLANETSCALE_USERNAME,
                  password: env.PLANETSCALE_PASSWORD,
                  database: DB_NAME,
                  ssl: {
                      rejectUnauthorized: true,
                  },
              }
    ) satisfies Extract<DrizzleConfig, { dialect: 'mysql' }>['dbCredentials'];
}
