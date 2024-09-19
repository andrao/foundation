/**
 * CloudFront Function handler event type
 * @see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-event-structure.html
 */
export interface ICloudFrontFunctionEvent {
    version: '1.0';
    context: {
        distributionDomainName: string;
        distributionId: string;
        eventType: string;
        requestId: string;
    };
    viewer: {
        ip: string;
    };
    request: {
        method: string;
        uri: string;
        querystring: Record<string, { value: string; multiValue?: Array<{ value: string }> }>;
        headers: Record<
            | 'host'
            | 'user-agent'
            | 'accept'
            | 'accept-language'
            | 'accept-encoding'
            | 'origin'
            | 'referer'
            | 'cloudfront-viewer-country',
            HeaderValue
        > &
            Record<string, HeaderValue>;
        cookies: Record<string, { value: string; multiValue?: Array<{ value: string }> }>;
    };
    response: {
        statusCode: number;
        statusDescription: string;
        headers: Record<string, { value: string }>;
        cookies: Record<
            string,
            {
                value: string;
                attributes: string;
                multiValue?: Array<{ value: string; attributes: string }>;
            }
        >;
    };
}

interface HeaderValue {
    value: string;
    multiValue?: Array<{ value: string }>;
}
