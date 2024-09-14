/* eslint-disable import/no-extraneous-dependencies */
import { afterAll, jest } from '@jest/globals';
import request from 'supertest';

/**
 * Mocks, globals
 */
const MOCK_PATH = '/home';

jest.mock('@acme/paths', () => ({
    PATHS: { home: MOCK_PATH },
}));

/**
 * Import dependencies
 */
const { app, server } = await import('.');
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
describe(PATHS.home, () => {
    it(`responds with 'Hello world!'`, async () => {
        const response = await request(app).get(PATHS.home);

        expect(response.text).toBe('Hello world!');
        expect(response.status).toBe(200);
    });
});
