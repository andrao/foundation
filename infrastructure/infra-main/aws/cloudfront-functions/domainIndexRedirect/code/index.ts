import { handler } from './handler';
import { buildKeyValueStoreCodeString } from './keyValueStore';

const ID_EXTRACTION_PATTERN = /\/([a-z0-9-]+?)$/;

/**
 * @function getHandlerCode
 * @description Stringify the handler code, and prefix with KVS import
 */
export function getHandlerCode({ arn }: { arn: string }) {
    const kvs_id = ID_EXTRACTION_PATTERN.exec(arn)?.[1];
    if (!kvs_id) throw new Error(`Could not extract KVS ID from arn "${arn}"`);

    return [buildKeyValueStoreCodeString({ kvs_id }), handler.toString()].join('\n');
}
