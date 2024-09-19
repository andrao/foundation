/* eslint-disable import/no-extraneous-dependencies */
import { jest } from '@jest/globals';

/**
 * Import dependencies
 */
const { PATHS } = await import('.');

/**
 * Setup
 */
beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
});

/**
 * Tests
 */
describe(`PATHS`, () => {
    describe(PATHS.home, () => {
        it('returns a string path', () => {
            expect(typeof PATHS.home).toBe('string');
        });
    });
});
