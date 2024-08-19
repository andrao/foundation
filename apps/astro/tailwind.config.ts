import config, { type Config } from '@andrao/tailwind';

export default {
    // We need to append the path to the UI package to the content array so that
    // those classes are included correctly.
    content: [
        ...config.content,
        './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
        '../../packages/@app-browser/**/*.{ts,tsx}',
    ],
    presets: [config],
} satisfies Config;
