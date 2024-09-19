import * as aws from '@pulumi/aws';
import { getHandlerCode } from './code';

const DOMAIN_KVS = new aws.cloudfront.KeyValueStore('foundation-cloudfront-kv', {
    name: 'foundation',
    comment: `andrao/foundation repo key value store`,
});

/**
 * @const CLOUDFRONT_DOMAIN_INDEX_REDIRECT
 * @description Redirects based on subdomain
 */
export const CLOUDFRONT_DOMAIN_INDEX_REDIRECT = new aws.cloudfront.Function(
    'foundation-cf-domain-redirect',
    {
        name: 'foundation-cf-domain-redirect',
        comment: `Redirects requests based on subdomain, and defaults to index.html for folders`,
        runtime: 'cloudfront-js-2.0',
        keyValueStoreAssociations: [DOMAIN_KVS.arn],

        /**
         * @comment DOMAIN_KVS.id is returning name, not UUID-like ID value required by handler; can extract from arn
         */
        code: DOMAIN_KVS.arn.apply(arn => getHandlerCode({ arn })),
    },
);
