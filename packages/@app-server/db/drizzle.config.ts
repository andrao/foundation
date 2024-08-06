import type { Config } from 'drizzle-kit';
import { getConnectionUri } from './src/util/getConnectionUri';

/**
 * @see https://orm.drizzle.team/kit-docs/conf
 */
export default {
    schema: './src/schema/*',
    dialect: 'postgresql',
    dbCredentials: { url: getConnectionUri('MIGRATION') },
    out: './.drizzle',
    // tablesFilter: ['app_*'],
} satisfies Config;
