/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import querystring from 'querystring';
import { afterAll, jest } from '@jest/globals';
import { JSONPath } from 'jsonpath-plus';
import request from 'supertest';

/**
 * Mocks, globals
 */
const MOCK_PATH = '/test/api/trpc';

jest.mock('@acme/paths', () => ({
    PATHS: { api: { trpc: MOCK_PATH } },
}));

/**
 * Import dependencies
 */
const { app, server } = await import('./');
const { PATHS } = await import('@acme/paths');

/**
 * Setup
 */
beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(done => {
    server.close(() => done());
});

/**
 * Tests
 */
describe(`when invoking the getProtectedMessage procedure`, () => {
    const mock_n = 6;

    async function act({ auth }: { auth: string | null }) {
        /**
         * @const uri
         * @description getProtectedMessage procedure invocation URI
         * @example /api/trpc/basic.getProtectedMessage?batch=1&input={"0":{"json":{"n":1}}}
         */
        const uri = path.join(PATHS.api.trpc, 'basic.getProtectedMessage?').concat(
            querystring.stringify({
                batch: 1,
                input: JSON.stringify({ 0: { json: { n: mock_n } } }),
            }),
        );

        const req = request(app).get(uri);
        return auth ? req.set('x-auth', auth) : req;
    }

    describe(`and an x-auth header is included`, () => {
        const mock_auth = '123';

        it(`responds with a 200`, async () => {
            const response = await act({ auth: mock_auth });
            expect(response.status).toBe(200);
        });

        it(`responds with a formatted message`, async () => {
            const response = await act({ auth: mock_auth });
            expect(response.body).toEqual([
                expect.objectContaining({
                    result: {
                        data: { json: `Welcome, this is the protected message – n=${mock_n}` },
                    },
                }),
            ]);
        });
    });

    describe(`and an x-auth header is omitted`, () => {
        const mock_auth = null;

        it(`responds with a 401`, async () => {
            const response = await act({ auth: mock_auth });
            expect(response.status).toBe(401);
        });

        it(`responds with a formatted error message`, async () => {
            const response = await act({ auth: mock_auth });

            expect(
                JSONPath({ json: response.body as object, path: '$.0.error.json.message' }),
            ).toEqual([`UNAUTHORIZED`]);
        });
    });
});
