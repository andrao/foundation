import checker from 'license-checker';
import { getProjects } from './getProjects';
import { isPermissible } from './isPermissible';

/* eslint-disable import/no-named-as-default-member */

const PROJECTS = getProjects();
const PROJECT_NAMES = PROJECTS.map(({ project }) => project);

/**
 * Scan a directory for impermissible dependencies
 */
function scanDirectory({ path, project }: { path: string; project: string }): Promise<number> {
    return new Promise((resolve, reject) => {
        checker.init({ start: path }, (err, deps) => {
            const error = err as Error | undefined;
            if (error) {
                reject(error);
                return;
            }

            // Parse license data
            const dependencies = Object.entries(deps)
                .map(([name, info]) => ({ name, licenses: info.licenses }))
                .filter(dep => !PROJECT_NAMES.includes(dep.name)); // Omit internal projects from check

            // Determine impermissible dependencies
            const impermissible = dependencies.filter(dep => !isPermissible(dep));

            if (impermissible.length) {
                impermissible.forEach(dependency => {
                    console.error(
                        `%s license for %s in project %s is impermissible.`,
                        dependency.licenses,
                        dependency.name,
                        project,
                    );
                });

                reject(new Error(`impermissible dependencies found in ${path}`));
            } else resolve(dependencies.length);
        });
    });
}

/**
 * Run check on all projects
 */
void (async function () {
    let n = 0;
    for (const project of PROJECTS) {
        try {
            n += await scanDirectory(project);
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
    }

    console.log(`All ${n} dependencies across ${PROJECTS.length} projects are permissible.`);
})();
