'use client';

import type { IAppRouter } from '@acme/api';
import { transformer } from '@acme/api/transformer';
import { PATHS } from '@acme/paths';
import { PORTS } from '@acme/paths/ports.js';
import { uriJoin } from '@andrao/tools/uriJoin';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { loggerLink, unstable_httpBatchStreamLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import { useState, type PropsWithChildren } from 'react';

/**
 * @interface IEnv
 * @description Environment variables
 */
interface IEnv {
    NODE_ENV: string;
    PORT: number;
    VERCEL_URL?: string;
}

/**
 * @const api
 * @description tRPC client for client components
 */
export const api = {
    browser: createTRPCReact<IAppRouter>(),
};

export type IAppRouterTRPCClient = ReturnType<(typeof api)['browser']['useUtils']>['client'];

/**
 * @function TRPCReactProvider
 * @description tRPC API context provider
 * - Resolves the tRPC API context when handling a request from a client component
 * @see Resolves the tRPC API context when handling a request from a NextJS React Server Component
 */
export function TRPCReactProvider({
    children,
    env,
    source,
}: PropsWithChildren<{ env: IEnv; source: string }>) {
    const [query_client] = useState(() => new QueryClient());

    const [trpc_client] = useState(() =>
        api.browser.createClient({
            links: [
                loggerLink({
                    enabled: op =>
                        env.NODE_ENV === 'development' ||
                        (op.direction === 'down' && op.result instanceof Error),
                }),

                unstable_httpBatchStreamLink({
                    transformer,
                    url: uriJoin(getBaseUrl({ env }), PATHS.api.trpc),
                    fetch: (url, options) =>
                        fetch(url, {
                            ...options,
                            headers: {
                                ...options?.headers,
                                'x-trpc-source': source,
                                /** @tmp */
                                'x-auth': 'Bearer 123',
                            },
                            /** @todo @tmp */
                            // credentials: 'include',
                        }),
                }),
            ],
        }),
    );

    return (
        <QueryClientProvider client={query_client}>
            <api.browser.Provider client={trpc_client} queryClient={query_client}>
                {children}
            </api.browser.Provider>
        </QueryClientProvider>
    );
}

/**
 * @function getBaseUrl
 * @description Get the base URL for the current environment
 */
function getBaseUrl({ env }: { env: IEnv }): string {
    // A: If deployed...?

    // B: Locally, use apps/api-trpc
    return `http://localhost:${PORTS.api_trpc}`;
}
