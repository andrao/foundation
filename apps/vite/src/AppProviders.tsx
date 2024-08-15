import { TRPCReactProvider } from '@acme/api-client';
import type { PropsWithChildren } from 'react';
import { env } from './env';

export function AppProviders({ children }: PropsWithChildren) {
    return (
        <TRPCReactProvider source='vite' env={env}>
            {children}
        </TRPCReactProvider>
    );
}
