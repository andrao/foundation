/**
 * @const KVS
 * @description Typed placeholder for key value store access in a CloudFront function
 * @see https://aws.amazon.com/blogs/aws/introducing-amazon-cloudfront-keyvaluestore-a-low-latency-datastore-for-cloudfront-functions/
 */
export const KVS = {
    get: (key: string) => Promise.resolve(key),
};

/** Must equal const name above! */
const KVS_VAR_NAME = 'KVS';

/**
 * Build the code string for key value store access in a CloudFront function
 */
export function buildKeyValueStoreCodeString({ kvs_id }: { kvs_id: string }) {
    return `import cf from 'cloudfront';\n\nconst ${KVS_VAR_NAME} = cf.kvs('${kvs_id}');\n`;
}
