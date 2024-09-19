import config, { type Config } from '@andrao/tailwind';

export default {
    content: [...config.content],
    presets: [config],
} satisfies Config;
