import * as aws from '@pulumi/aws';

export const CERTIFICATE = new aws.acm.Certificate('foundation-certificate', {
    domainName: 'foundation.andrewla.ke',
    validationMethod: 'DNS',
    validationOptions: [
        {
            domainName: 'foundation.andrewla.ke',
            validationDomain: 'andrewla.ke',
        },
    ],
});

export const WILDCARD_CERTIFICATE = new aws.acm.Certificate('foundation-certificate-wildcard', {
    domainName: '*.andrewla.ke',
    validationMethod: 'DNS',
});
