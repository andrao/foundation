import { createRequire } from 'node:module';

/** @typedef {import("prettier").Config} PrettierConfig */
/** @typedef {import("prettier-plugin-tailwindcss").PluginOptions} TailwindConfig */
/** @typedef {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig */

const require = createRequire(import.meta.url);

/** @type { PrettierConfig | SortImportsConfig | TailwindConfig } */
const config = {
    arrowParens: 'avoid',
    importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
    importOrderTypeScriptVersion: '5.4.3',
    jsxSingleQuote: true,
    printWidth: 100,
    singleQuote: true,
    tabWidth: 4,
    overrides: [
        {
            files: '*.css',
            options: { tabWidth: 2 },
        },
        {
            files: '*.json',
            options: { trailingComma: 'none' },
        },
    ],
    plugins: [
        '@ianvs/prettier-plugin-sort-imports',
        'prettier-plugin-packagejson',
        'prettier-plugin-sh',
        'prettier-plugin-tailwindcss',
    ],

    tailwindConfig: require.resolve('@andrao/tailwind'),
    tailwindFunctions: ['cn', 'cva'],
};

export default config;
