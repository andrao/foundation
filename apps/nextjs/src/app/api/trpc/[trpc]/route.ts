import { APP_ROUTER, createTRPCContext } from '@acme/api';
import { PATHS } from '@acme/paths';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { env } from '~/env';
import type { NextRequest } from 'next/server';

/**
 * @todo May need to set runtime to run certain NPM dependencies
 * @const runtime
 * @see https://vercel.com/docs/functions/serverless-functions/runtimes
 */
// export const runtime = 'nodejs';

/**
 * @const dynamic
 * @description API requests must be dynamically rendered; i.e. not cached
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#options
 * @see https://nextjs.org/docs/app/building-your-application/rendering/server-components#dynamic-rendering
 */
export const dynamic = 'force-dynamic'; // static by default, unless reading the request

/**
 * @nextRouteHandler
 * @function handler
 * @description Route tRPC API requests to their respective procedures
 * @note If you want to do CORS, see commented-out code from https://github.com/andrao/foundation/commit/36bad7b466577c38831a4e2e80485ed282b14a22
 */
async function tRPCRequestHandler(req: NextRequest): Promise<Response> {
    /**
     * Fetch response from tRPC router
     */
    return await fetchRequestHandler({
        endpoint: PATHS.api.trpc,
        req,
        router: APP_ROUTER,
        createContext: () => createTRPCContext({ req, env }),
        onError: ({ path, error }) => {
            console.error(
                `❌ tRPC failed on ${path ?? '<no-path>'}:`,
                error.code === 'NOT_FOUND' ? error.code : error,
            );
        },

        // responseMeta: () => ({ headers: CORS_HEADERS }),
    });
}

export { tRPCRequestHandler as GET, tRPCRequestHandler as OPTIONS, tRPCRequestHandler as POST };
