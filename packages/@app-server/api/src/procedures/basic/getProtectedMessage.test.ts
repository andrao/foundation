// eslint-disable-next-line import/no-extraneous-dependencies
import { jest } from '@jest/globals';
import type { inferProcedureInput } from '@trpc/server';
import { createTRPCContextInner, type ITRPCContext } from '../../trpc/context';
import { createCallerFactory } from '../../trpc/instance';
import { createTRPCRouter } from '../../trpc/procedure-middleware';

/**
 * Import dependencies
 */
const { getProtectedMessage } = await import('./getProtectedMessage');

/**
 * Setup
 */
beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
});

const MOCK_ROUTER = createTRPCRouter({ getProtectedMessage });

/**
 * @function buildCaller
 * @description Create a tRPC procedure caller for a request
 */
function buildCaller(ctx?: Partial<Pick<ITRPCContext, 'headers' | 'env'>>) {
    return createCallerFactory(MOCK_ROUTER)(
        createTRPCContextInner({ source: 'jest', env: { PORT: 3000 }, headers: {}, ...ctx }),
    );
}

/**
 * Tests
 */
describe(`when the authentication header is omitted`, () => {
    const caller = buildCaller();

    async function act(input: inferProcedureInput<typeof getProtectedMessage>) {
        return await caller.getProtectedMessage(input);
    }

    it(`throws an UNAUTHORIZED error`, async () => {
        await expect(act()).rejects.toThrow('UNAUTHORIZED');
    });
});

describe(`when an authentication header is included`, () => {
    const caller = buildCaller({
        headers: { 'x-auth': '123' },
    });

    async function act(input: inferProcedureInput<typeof getProtectedMessage>) {
        return await caller.getProtectedMessage(input);
    }

    describe(`and an input.n value is provided`, () => {
        describe(`under 10`, () => {
            it(`responds with the formatted message`, async () => {
                await expect(act({ n: 5 })).resolves.toBe(
                    'Welcome, this is the protected message – n=5',
                );
            });
        });

        describe(`over 10`, () => {
            it(`throws an error`, async () => {
                await expect(act({ n: 10 })).rejects.toThrow(`That's enough!`);
            });
        });
    });

    describe(`and an input.n value is not provided`, () => {
        it(`responds with the default message`, async () => {
            await expect(act()).resolves.toBe('Welcome, this is the protected message – n=0');
        });
    });
});
