'use client';

import { cn } from '@ui/util';
import { TriangleAlert } from 'lucide-react';
import { useContext } from 'react';
import { ErrorContext } from './ErrorBoundary';

/**
 * @function ErrorComponent
 * @description Error boundary fallback component
 */
export function ErrorComponent({ heading, className }: { heading: string; className?: string }) {
    const { error } = useContext(ErrorContext);

    return (
        <div
            className={cn(
                'flex size-full max-h-full items-center justify-center overflow-auto',
                className,
            )}
        >
            <div className='flex max-h-full w-full max-w-xl justify-center overflow-hidden p-4'>
                <div className='flex max-h-full min-w-[280px] flex-col gap-2 overflow-auto rounded-lg border border-red-400 px-4 py-3'>
                    <div className='flex items-center gap-3 font-semibold'>
                        <TriangleAlert className='size-4 text-red-400' />
                        <span>{heading}</span>
                    </div>

                    {error ? (
                        <div className='flex flex-col gap-1 pl-7 text-sm text-accent-foreground'>
                            {error.split('\n').map((l, index) => (
                                <p key={index}>{l}</p>
                            ))}
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
