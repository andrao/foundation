import type { NextApiRequest } from 'next';
import type { NextRequest } from 'next/server';

const SOURCE_HEADER = `x-trpc-source`;

/**
 * @interface ITRPCContext
 * @description tRPC context
 */
export interface ITRPCContext {
    env: IAPIEnvVars;
    headers: Record<string, string>;
}

/**
 * @interface IAPIEnvVars
 * @description Environment variables required for API procedures
 */
interface IAPIEnvVars {
    ANTHROPIC_API_KEY: string;
    OPENAI_API_KEY: string;
    PORT: number;
    VERCEL_ENV: 'development' | 'preview' | 'production';
}

/**
 * @function createTRPCContextInner
 * @description Create a context given a Clerk auth object
 */
export function createTRPCContextInner(
    ctx: Omit<ITRPCContext, 'dbx' | 'pubsub'> & {
        source: string;
    },
): ITRPCContext {
    const { env, source } = ctx;

    // @tmp
    console.log('>>> incoming tRPC Request from', source);

    return { ...ctx };
}

/**
 * @function createTRPCContext
 * @description Creates a tRPC context for all procedures
 * @see https://trpc.io/docs/server/context
 */
export function createTRPCContext({
    req,
    env,
}: {
    req: NextRequest | NextApiRequest;
    env: IAPIEnvVars;
}): ITRPCContext {
    const headers: Record<string, string> = isNextRequest(req)
        ? [...req.headers.entries()].reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
        : req.headers;

    return createTRPCContextInner({
        env,
        headers,
        source: headers[SOURCE_HEADER] ?? 'unknown',
    });
}

/**
 * @function isNextRequest
 * @description NextRequest type predicate
 */
function isNextRequest(req: NextRequest | NextApiRequest): req is NextRequest {
    return !!(req as NextRequest).headers.get;
}
