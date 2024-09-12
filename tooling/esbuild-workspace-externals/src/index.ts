import { readFile } from 'fs/promises';
import { join } from 'path';
import { type Plugin } from 'esbuild';

/**
 * @const WORKSPACE_EXTERNALS_PLUGIN
 * @description esbuild plugin to include internal workspace dependencies in bundle
 */
export const WORKSPACE_EXTERNALS_PLUGIN = {
    name: 'pnpm-workspace-externals',
    async setup(b) {
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        const cwd = b.initialOptions.absWorkingDir || process.cwd();

        /**
         * Determine external modules using module's package.json content
         * - Internal modules use version "workspace:*"
         */
        const package_json = await readFile(join(cwd, 'package.json'), 'utf8');
        const { dependencies } = JSON.parse(package_json) as {
            dependencies: Record<string, string>;
        };

        const external_modules = Object.entries(dependencies)
            .filter(([, version]) => !version.startsWith('workspace'))
            .map(([name]) => name);

        /**
         * For each path resolution: determine whether importing from external module, & mark
         */
        b.onResolve({ namespace: 'file', filter: /.*/ }, args => {
            // Account for nested file imports
            const module_name = args.path.startsWith('@')
                ? args.path.split('/').slice(0, 2).join('/')
                : args.path.split('/')[0];

            if (module_name && external_modules.includes(module_name))
                return { path: args.path, external: true };

            return null;
        });
    },
} satisfies Plugin;
