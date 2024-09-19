import type { Config } from 'drizzle-kit';
import { env } from './env';
import { getLocalDbCredentials } from './src/connections/local';
import { getPlanetScaleDbCredentials } from './src/connections/planetscale/params';

/**
 * @see https://orm.drizzle.team/kit-docs/conf
 */
export default {
    schema: './src/schema/*',
    dialect: 'mysql',
    dbCredentials: env.USE_LOCAL_MYSQL ? getLocalDbCredentials() : getPlanetScaleDbCredentials(),
    out: './.drizzle',
    // tablesFilter: ['app_*'],
} satisfies Config;
