import type { ICloudFrontFunctionEvent } from '../../types';
import { KVS } from './keyValueStore';

/**
 * @description CloudFront Function to redirect domain requests to the correct merchant
 * @comment Function must be called "handler"
 * @comment THIS IS NOT A NORMAL FUNCTION! No imports allowed! This function is stringified and passed into Pulumi
 * @comment This function uses the "cloudfront-js-2.0" runtime
 * @comment You can test out changes without deploying to production in the AWS CloudFront functions console
 * @see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-functions.html
 */
async function handler(event: ICloudFrontFunctionEvent) {
    const request = event.request;
    const host = request.headers.host.value;

    /**
     * A: If no file extension, we have a PAGE REQUEST (HTML)
     * - Incorporate merchant_id routing into the URI
     * - Append index.html
     * B: Otherwise, we're requesting a static asset: let the request be
     */
    if (!request.uri.includes('.')) {
        try {
            const merchant_id = await KVS.get(host);
            request.uri = `/merchants/${merchant_id}${request.uri}`;
        } catch (error) {
            // If merchant not found for host, return 404
            return {
                statusCode: 404,
                statusDescription: 'Not Found',
            };
        }

        // Append index.html
        if (request.uri.endsWith('/')) {
            request.uri += 'index.html';
        } else {
            request.uri += '/index.html';
        }
    }

    return request;
}

// Avoid `export` in function declaration
export { handler };
