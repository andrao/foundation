import '@andrao/tailwind/tailwind.css';
import { ErrorBoundary } from '@ui/components/error/ErrorBoundary';
import { ErrorComponent } from '@ui/components/error/ErrorComponent';
import { Toaster } from '@ui/components/ui/sonner';
import { TooltipProvider } from '@ui/components/ui/tooltip';
import { cn } from '@ui/util';
import { env } from '~/env';
import { GeistMono } from 'geist/font/mono';
import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from 'next-themes';
import { Inter } from 'next/font/google';
import type { PropsWithChildren } from 'react';
import './layout.css';

/**
 * @const FONT_SANS - Application sans-serif font
 * @comment next/font fonts must be global-scope const
 */
const FONT_SANS = Inter({
    subsets: ['latin'],
    variable: '--font-sans',
});

/**
 * @const FONT_MONO - Application monospace font
 * @comment Update @andrao/tailwind if switching in/out on Geist
 */
const FONT_MONO = GeistMono;

/**
 * @const metadata
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/metadata
 */
export const metadata: Metadata = {
    title: 'NextJS app',
    description: 'Foundation NextJS application',
};

/**
 * @const viewport
 * @description Customize the initial viewport of the page
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-viewport
 */
export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: 'white' },
        { media: '(prefers-color-scheme: dark)', color: 'black' },
    ],
};

/**
 * @function RootLayout
 * @description Root layout for all pages
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en' suppressHydrationWarning>
            <body
                className={cn(
                    'background-gradient text-foreground antialiased',
                    FONT_SANS.className,
                    FONT_SANS.variable,
                    FONT_MONO.variable,
                )}
            >
                <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
                    <ErrorBoundary
                        fallback={
                            <ErrorComponent
                                heading='Error loading page'
                                className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
                            />
                        }
                        vercel_env={env.VERCEL_ENV}
                    >
                        <Providers>{children}</Providers>
                    </ErrorBoundary>
                    <Toaster richColors closeButton position='top-right' />
                </ThemeProvider>
            </body>
        </html>
    );
}

/**
 * @todo Un-comment ClerkProvider when NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY env var is added
 */
function Providers(props: PropsWithChildren) {
    return (
        // <ClerkProvider>
        <TooltipProvider>{props.children}</TooltipProvider>
        // </ClerkProvider>
    );
}
