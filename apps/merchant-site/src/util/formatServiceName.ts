/**
 * Make service nameSEO & URL friendly
 */
export function formatServiceName(service_name: string) {
    return service_name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]+/g, '')
        .replace(/^-+|-+$/g, '')
        .replace(/-+/g, '-');
}
