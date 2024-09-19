import config, { type Config } from '@andrao/tailwind';

export default {
    presets: [config],
    // We need to append the path to the UI package to the content array so that
    // those classes are included correctly.
    content: [
        './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
        '../../packages/core/browser/ui/src/**/*.{ts,tsx}',
    ],

    theme: {
        extend: {
            colors: {
                accent: 'rgb(var(--accent) / <alpha-value>)',
                'accent-light': 'rgb(var(--accent-light) / <alpha-value>)',
                'accent-dark': 'rgb(var(--accent-dark) / <alpha-value>)',
            },
            backgroundImage: {
                'accent-gradient': 'var(--accent-gradient)',
            },

            gridTemplateColumns: {
                autofit: 'repeat(auto-fit, minmax(24ch, 1fr))',
            },
        },
    },
} satisfies Config;
