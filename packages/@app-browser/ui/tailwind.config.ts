import config from '@andrao/tailwind';
import type { Config } from 'tailwindcss';

export default {
    content: [...config.content],
    presets: [config],
} satisfies Config;
