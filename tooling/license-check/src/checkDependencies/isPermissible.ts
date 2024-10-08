/**
 * @const OPEN_SOURCE_LICENSES
 * @description List of regex patterns for open source licenses
 * @see https://github.com/eslint/eslint/blob/b516974713ada28c75f1e21599fc0cec13a8b321/Makefile.js#L50
 */
const OPEN_SOURCE_LICENSES = [
    /^MIT/,
    /^BSD/,
    /^Apache/,
    /^ISC/,
    /^WTF/,
    /^Public Domain/,
    /^LGPL/,
    /^Python/,
    /^BlueOak/,
];

const DEV_ONLY_LICENSES = [/^MPL/];

/**
 * Check if a dependency is open-source
 */
export function isPermissible(
    {
        name,
        licenses,
    }: {
        name: string;
        licenses?: string | Array<string>;
    },
    type: 'production' | 'development',
): boolean {
    // A: If no licenses, we're good
    if (!licenses) return true;
    // B: If an array of licenses, check each one: only one needs to be permissible
    else if (Array.isArray(licenses))
        return licenses.some(license => isPermissible({ name, licenses: license }, type));

    return type === 'development'
        ? [...OPEN_SOURCE_LICENSES, ...DEV_ONLY_LICENSES].some(license => license.test(licenses))
        : OPEN_SOURCE_LICENSES.some(license => license.test(licenses));
}
