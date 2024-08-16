import { type ModuleInfos } from 'license-checker';
import { getProjects } from '../common/getProjects';
import { isPermissible } from './isPermissible';

const PROJECT_NAMES = getProjects().map(({ project }) => project);

/**
 * Check dependencies under a project directory
 */
export function checkDependencies({
    path,
    project,
    error,
    deps,
    type,
}: {
    path: string;
    project: string;
    error: Error | undefined;
    deps: ModuleInfos;
    type: 'production' | 'development';
}) {
    if (error?.message.match(/^No packages found in this path/)) return [];
    else if (error) throw error;

    // Parse license data
    const dependencies = Object.entries(deps)
        .map(([name, info]) => ({ name, licenses: info.licenses }))
        .filter(dep => !PROJECT_NAMES.includes(dep.name)); // Omit internal projects from check

    // Determine impermissible dependencies
    const impermissible = dependencies.filter(dep => !isPermissible(dep, type));

    if (impermissible.length) {
        impermissible.forEach(dependency => {
            console.error(
                `%s license for %s in project %s is impermissible.`,
                dependency.licenses,
                dependency.name,
                project,
            );
        });

        throw new Error(`impermissible dependencies found in ${path}`);
    } else {
        return dependencies.map(d => d.name);
    }
}
