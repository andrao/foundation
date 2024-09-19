import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

/**
 * @see https://astro.build/config
 */
export default defineConfig({
    integrations: [react(), tailwind()],
});
