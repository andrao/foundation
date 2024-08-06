const { PG_CONNECTION_URI_USER, PG_CONNECTION_URI_MIGRATE } = process.env;

/**
 * @function getConnectionUri
 * @description Get the connection URI for the database
 */
export function getConnectionUri(variant: 'USER' | 'MIGRATION') {
    const uri = variant === 'USER' ? PG_CONNECTION_URI_USER : PG_CONNECTION_URI_MIGRATE;
    if (!uri) throw new Error(`Missing database connection URI for variant "${variant}"`);

    return uri;
}
