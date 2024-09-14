/* eslint-disable import/no-extraneous-dependencies */

import { WORKSPACE_EXTERNALS_PLUGIN } from '@acme/esbuild-workspace-externals';
import { build } from 'esbuild';
// Validate env on build
import '../src/env';

await build({
    allowOverwrite: true,
    bundle: true,
    entryPoints: ['src/index.ts'],
    format: 'esm',
    outdir: 'dist',
    platform: 'node',
    target: ['node20'],

    plugins: [WORKSPACE_EXTERNALS_PLUGIN],
});
