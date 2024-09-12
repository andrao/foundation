import { DB_NAME } from '@acme/constants';
import * as github from '@pulumi/github';
import * as pulumi from '@pulumi/pulumi';

const config = new pulumi.Config();

// Get the active Pulumi stack
const stack = pulumi.getStack();

/**
 * @const REPO
 * @description The GitHub repository
 */
export const REPO = github.getRepository({ fullName: 'andrao/foundation' });

/**
 * Set up environments for the repository
 */
const repository = REPO.then(r => r.name);

// Environment
new github.RepositoryEnvironment('repo-env', {
    environment: stack,
    repository,
});

// Variables
new github.ActionsEnvironmentVariable('PLANETSCALE_ORG_NAME', {
    environment: stack,
    repository,
    variableName: 'PLANETSCALE_ORG_NAME',
    value: 'steve-n',
});

new github.ActionsEnvironmentVariable('PLANETSCALE_DATABASE_NAME', {
    environment: stack,
    repository,
    variableName: 'PLANETSCALE_DATABASE_NAME',
    value: DB_NAME,
});

// Secrets
for (const v of ['PLANETSCALE_SERVICE_TOKEN_ID', 'PLANETSCALE_SERVICE_TOKEN']) {
    new github.ActionsEnvironmentSecret(v, {
        environment: stack,
        repository,
        secretName: v,
        plaintextValue: config.requireSecret(v),
    });
}
