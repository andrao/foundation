import checker from 'license-checker';
import { checkDependencies } from './checkDependencies';
import { getProjects } from './common/getProjects';

/* eslint-disable import/no-named-as-default-member */

const PROJECTS = getProjects();

/**
 * Scan a directory for impermissible dependencies
 */
function scanDirectory(
    { path, project }: { path: string; project: string },
    type: 'production' | 'development',
): Promise<Array<string>> {
    return new Promise((resolve, reject) => {
        checker.init(
            { start: path, production: type === 'production', development: type === 'development' },
            (error, deps) => {
                try {
                    const results = checkDependencies({ path, project, error, deps, type });
                    resolve(results);
                } catch (err) {
                    reject(err as Error);
                }
            },
        );
    });
}

/**
 * Run check on all projects
 */
void (async function () {
    const list = new Set<string>();

    for (const project of PROJECTS) {
        for (const type of ['production', 'development'] as const) {
            try {
                const deps = await scanDirectory(project, type);
                deps.forEach(d => list.add(d));
            } catch (error) {
                console.error(type, error);
                process.exit(1);
            }
        }
    }

    console.log(
        `All ${list.size} unique dependencies across ${PROJECTS.length} projects are permissible.`,
    );
})();
