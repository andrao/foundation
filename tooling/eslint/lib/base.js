/** @type {import("eslint").Linter.Config} */
const config = {
    parser: '@typescript-eslint/parser',
    parserOptions: { project: true, extraFileExtensions: ['.json'] },
    env: {
        es2022: true,
        node: true,
    },

    plugins: [
        '@tanstack/query',
        '@typescript-eslint',
        'astro',
        'import',
        'json',
        'jsx-a11y',
        'prettier',
        'react',
        'react-hooks',
        'react-refresh',
        'unicorn',
    ],

    extends: [
        'turbo',
        'eslint:recommended',
        'plugin:@typescript-eslint/strict-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
        'plugin:@tanstack/eslint-plugin-query/recommended',
        'plugin:astro/base',
        'plugin:astro/recommended',
        'plugin:import/errors',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'prettier',
    ],

    ignorePatterns: [
        'node_modules',
        'dist',
        'build',
        '.astro',
        '.DS_Store',
        '.env',
        '.expo',
        '.jest',
        '.next',
        '.nx',
        '.turbo',
    ],

    reportUnusedDisableDirectives: true,

    settings: {
        /** @see https://github.com/import-js/eslint-import-resolver-typescript#configuration */
        'import/parsers': { '@typescript-eslint/parser': ['.ts', '.tsx'] },
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
                project: true,
            },
        },
    },

    rules: {
        // turbo
        'turbo/no-undeclared-env-vars': 'off',

        // @typescript-eslint
        '@typescript-eslint/array-type': ['error', { default: 'generic' }],
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/no-confusing-void-expression': [
            'error',
            { ignoreArrowShorthand: true },
        ],
        '@typescript-eslint/no-empty-function': 0,
        '@typescript-eslint/no-misused-promises': [
            'error',
            { checksVoidReturn: { attributes: false } },
        ],
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/no-unused-vars': [
            'warn',
            { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
        ],
        '@typescript-eslint/no-use-before-define': [
            'error',
            { functions: false, allowNamedExports: true, ignoreTypeReferences: true },
        ],
        '@typescript-eslint/prefer-promise-reject-errors': 'warn',
        '@typescript-eslint/prefer-nullish-coalescing': 'warn',
        '@typescript-eslint/restrict-template-expressions': [
            'error',
            { allowBoolean: true, allowNever: true, allowNullish: true, allowNumber: true },
        ],

        // import
        'import/no-extraneous-dependencies': [
            'error',
            { devDependencies: ['**/*.test.ts', 'drizzle.config.ts', 'tailwind.config.ts'] },
        ],
        'import/no-relative-packages': ['error'],

        // json
        'json/trailing-comma': 'error',
        'json/*': ['error', { allowComments: true }],

        // unicorn
        'unicorn/filename-case': 0,
        'unicorn/no-array-reduce': 0,
        'unicorn/no-nested-ternary': 0,
        'unicorn/no-null': 0,
        'unicorn/no-object-as-default-parameter': 0,
        'unicorn/no-useless-undefined': 0,
        'unicorn/prefer-export-from': 0,
        'unicorn/prefer-object-from-entries': 0,
        'unicorn/prevent-abbreviations': 0,

        // Default eslint rules
        'no-use-before-define': ['error', { functions: false, allowNamedExports: true }],
        // curly: ['error', 'all'],
        'func-style': ['error', 'declaration'],
        // 'no-undef': 0,
        // 'prefer-const': ['error', { destructuring: 'all' }],
    },

    overrides: [
        {
            files: ['*.astro'],
            parser: 'astro-eslint-parser',
            parserOptions: {
                parser: '@typescript-eslint/parser',
                extraFileExtensions: ['.astro'],
            },
            rules: {},
        },
        {
            files: ['*.ts', '*.tsx'],
            rules: {
                'no-use-before-define': 0,
            },
        },
        // ...
    ],
};

module.exports = config;
