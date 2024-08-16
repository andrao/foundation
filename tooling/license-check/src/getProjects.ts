import { execSync } from 'child_process';
import path from 'path';

const ROOT_DIRECTORY = path.resolve(__dirname, '../../..');
const ROOT_DIRECTORY_REGEX = new RegExp(`${ROOT_DIRECTORY.replace(/\//g, '\\/')}\\/(.+?)\\s`);

/**
 * Get list of workspace project names and file paths
 */
export function getProjects() {
    const output = execSync('pnpm -r list --depth -1', { encoding: 'utf8' });

    return output
        .split('\n')
        .filter(Boolean)
        .map(p => ({
            path: path.resolve(ROOT_DIRECTORY, ROOT_DIRECTORY_REGEX.exec(p)?.[1] ?? ''),
            project: /^(.+?)\s/.exec(p)?.[1] ?? '',
        }));
}
