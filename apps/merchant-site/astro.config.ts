import react from '@astrojs/react';
import { defineConfig } from 'astro/config';

/**
 * @see https://astro.build/config
 */
export default defineConfig({
    integrations: [react()],
});
