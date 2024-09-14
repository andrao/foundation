/* eslint-disable @typescript-eslint/require-await */
import chalk from 'chalk';
import { ctx } from './ctx';

/**
 * Do something
 */
void (async function () {
    console.log(chalk.green('Hello, world!'));

    // console.log(chalk.green('Done!'));
    process.exit();
})();
