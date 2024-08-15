import { PORTS as P } from './ports.js';

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

/**
 * @const PORTS
 * @description Localhost server ports
 */
export const PORTS = P satisfies Record<string, number>;
