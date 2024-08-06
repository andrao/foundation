import config from '@andrao/tailwind';
import type { Config } from 'tailwindcss';

export default {
    // We need to append the path to the UI package to the content array so that
    // those classes are included correctly.
    content: [...config.content, '../../packages/@app-browser/**/*.{ts,tsx}'],
    presets: [config],
} satisfies Config;
