/**
 * @const PATHS
 * @description Application URL paths
 */
export const PATHS = {
    home: `/` as const,
    api: {
        trpc: '/api/trpc' as const,
    },
    onelocal: {
        SCHEDULE_WEBHOOK: '/schedule' as const,
    },
};
