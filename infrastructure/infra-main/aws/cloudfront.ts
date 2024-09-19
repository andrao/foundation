import { CLOUDFRONT_ORIGIN_PATH } from '@acme/infra-constants/aws';
import * as aws from '@pulumi/aws';
import { CERTIFICATE, WILDCARD_CERTIFICATE } from './acm';
import { CLOUDFRONT_DOMAIN_INDEX_REDIRECT } from './cloudfront-functions/domainIndexRedirect';
import { BUCKET } from './s3';

/**
 * @const ORIGIN_ACCESS_IDENTITY
 * @description Origin access identity for CloudFront
 */
const ORIGIN_ACCESS_IDENTITY = new aws.cloudfront.OriginAccessIdentity(
    'foundation-bucket-access-identity',
);

/**
 * @const BUCKET_CDN
 * @description CloudFront distribution for the S3 bucket holding assets
 */
export const BUCKET_CDN = new aws.cloudfront.Distribution('foundation-bucket-distribution', {
    comment: `andrao/foundation repo bucket`,

    origins: [
        {
            domainName: BUCKET.bucketRegionalDomainName,
            originId: BUCKET.arn,
            originPath: `/${CLOUDFRONT_ORIGIN_PATH}`,
            s3OriginConfig: {
                originAccessIdentity: ORIGIN_ACCESS_IDENTITY.cloudfrontAccessIdentityPath,
            },
        },
    ],

    enabled: true,
    isIpv6Enabled: true,
    priceClass: 'PriceClass_100',
    restrictions: { geoRestriction: { restrictionType: 'none' } },

    aliases: [CERTIFICATE.domainName, 'stonemasonry.andrewla.ke', 'cleaning.andrewla.ke'],
    viewerCertificate: {
        acmCertificateArn: WILDCARD_CERTIFICATE.arn,
        sslSupportMethod: 'sni-only',
        cloudfrontDefaultCertificate: false,
    },

    /** @todo: Make a 404 page at 404.html */
    // customErrorResponses: [
    //     {
    //         errorCode: 404,
    //         responseCode: 404,
    //         responsePagePath: `/404.html`,
    //     },
    // ],

    /**
     * Asset cache behaviour
     */
    defaultCacheBehavior: {
        targetOriginId: BUCKET.arn,

        allowedMethods: ['GET', 'HEAD', 'OPTIONS'],
        cachedMethods: ['GET', 'HEAD'],
        compress: true,
        forwardedValues: { queryString: true, cookies: { forward: 'all' } },
        viewerProtocolPolicy: 'redirect-to-https',

        functionAssociations: [
            { eventType: 'viewer-request', functionArn: CLOUDFRONT_DOMAIN_INDEX_REDIRECT.arn },
        ],

        minTtl: 0,
        /** @todo: Set higher TTLs  */
        defaultTtl: 60,
        maxTtl: 60,
        // defaultTtl: 60 * 60 * 4, // 4 hours
        // maxTtl: 60 * 60 * 24,
    },

    /**
     * @todo
     */
    orderedCacheBehaviors: [],
});

/** @todo? */
// new aws.cloudfront.KeyValueStore('foundation-cloudfront-kv', {
//     name: 'foundation',
//     comment: `andrao/foundation repo key value store`,
// });
