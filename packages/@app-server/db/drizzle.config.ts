import type { Config } from 'drizzle-kit';
import { getPlanetScaleDbCredentials } from './src/connections/planetscale/params';

/**
 * @see https://orm.drizzle.team/kit-docs/conf
 */
export default {
    schema: './src/schema/*',
    dialect: 'mysql',
    dbCredentials: getPlanetScaleDbCredentials(),
    out: './.drizzle',
    // tablesFilter: ['app_*'],
} satisfies Config;
