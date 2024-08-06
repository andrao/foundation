'use client';

import { cn } from '@ui/util';
import { cva, type VariantProps } from 'class-variance-authority';
import { ArrowBigUp, CornerDownLeft } from 'lucide-react';

/**
 * @interface IKeyCommand
 * @description Input key command
 */
export interface IKeyCommand {
    k: string;
    alt?: boolean;
    cmd?: boolean;
    shift?: boolean;
    not_if_input?: boolean;
}

/**
 * @const IS_MAC
 * @description Whether user is on a Mac
 */
const IS_MAC =
    typeof window !== 'undefined' ? navigator.platform.toUpperCase().includes('MAC') : true;

/**
 * @const wrapVariants
 * @description Keyboard input wrapper class variants
 */
const wrapVariants = cva(
    'pointer-events-none flex select-none items-center justify-center rounded border font-mono text-[11px] font-medium opacity-100',
    {
        variants: {
            variant: {
                default: 'bg-muted text-muted-foreground',
                primary:
                    'bg-muted text-muted-foreground dark:border-0 dark:text-primary-foreground',
            },
            size: {
                default: 'size-5',
                sm: 'size-4',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

/**
 * @function KeyboardInput
 * @description Return platform-sensitive kbd elements
 */
export function KeyboardInput({
    k,
    alt,
    cmd,
    shift,
    className,
    size,
    variant,
}: VariantProps<typeof wrapVariants> &
    IKeyCommand & {
        className?: string;
    }) {
    const cl = wrapVariants({ variant, size });

    const meta_key_size = size === 'sm' ? `text-[14px]` : `text-[16px]`;
    const arrow_size = size === 'sm' ? `size-3` : `size-4`;

    return (
        <div className={cn('hidden gap-[2px] sm:flex', className)} suppressHydrationWarning>
            {cmd && IS_MAC ? (
                <kbd className={cn(cl, 'pt-px', meta_key_size)}>⌘</kbd>
            ) : cmd ? (
                <kbd className={cl}>Ctrl</kbd>
            ) : null}

            {alt && IS_MAC ? (
                <kbd className={cn(cl, 'pt-px', meta_key_size)}>⌥</kbd>
            ) : alt ? (
                <kbd className={cl}>Alt</kbd>
            ) : null}

            {shift ? (
                <kbd className={cl}>
                    <ArrowBigUp className={arrow_size} />
                </kbd>
            ) : null}

            <kbd className={cl}>{formatKey(k)}</kbd>
        </div>
    );
}

function formatKey(k: string) {
    return k === 'Enter' ? <CornerDownLeft className='size-3' /> : k.toUpperCase();
}

/**
 * @function evaluateKeystroke
 * @description Evaluate whether event keystroke matches
 */
export function evaluateKeystroke(
    e: KeyboardEvent,
    { k, alt = false, cmd = false, shift = false, not_if_input = false }: IKeyCommand,
) {
    const is_input =
        (e.target instanceof HTMLElement && e.target.isContentEditable) ||
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement;

    const clauses = [
        e.key === k,
        alt === e.altKey,
        cmd === (e.metaKey || e.ctrlKey),
        shift === e.shiftKey,
        !not_if_input || !is_input,
    ];

    return clauses.every(Boolean);
}
