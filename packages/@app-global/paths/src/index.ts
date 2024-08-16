/**
 * @const PATHS
 * @description Application URL paths
 */
export const PATHS = {
    home: `/` as const,
    api: {
        trpc: '/api/trpc' as const,
    },
} satisfies Record<string, string | Record<string, string>>;
