'use client';

import { Button } from '@ui/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@ui/components/ui/card';
import { cn } from '@ui/util';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState, type PropsWithChildren, type ReactNode } from 'react';
import { EasyTooltip } from '../ui/tooltip';
import { evaluateKeystroke, KeyboardInput, type IKeyCommand } from './KeyboardInput';

/**
 * @function PanelCard
 * @description Card to show on panel
 *
 * @see https://codesandbox.io/p/sandbox/react-hook-form-usefieldarray-nested-arrays-m8w6j
 */
export function PanelCard({
    children,
    title,
    description,
    footer,
}: PropsWithChildren<{
    title: string;
    description: string;
    footer?: {
        content: ReactNode;
        tooltip_content: string;
        onClick: () => void;
        keystroke: IKeyCommand | null;
    };
}>) {
    /**
     * State
     * @const button_ref - Footer button reference
     */
    const [button_ref, setButtonRef] = useState<HTMLButtonElement | null>(null);

    /**
     * [On footer keystroke] Invoke button press
     */
    useEffect(() => {
        const { keystroke } = footer ?? {};
        if (!keystroke) return;

        // eslint-disable-next-line func-style
        const keydown = (e: KeyboardEvent) => {
            const run_cb = evaluateKeystroke(e, keystroke);

            if (run_cb && button_ref) {
                e.preventDefault();
                button_ref.click();
            }
        };

        document.addEventListener('keydown', keydown);
        return () => document.removeEventListener('keydown', keydown);
    }, [button_ref]);

    return (
        <Card>
            <CardHeader className='px-6 py-5'>
                <CardTitle className='text-md leading-none'>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className='px-4 py-0'>
                <motion.ul className='flex flex-col border-t border-accent'>{children}</motion.ul>
            </CardContent>
            {footer ? (
                <CardFooter className='justify-center p-2'>
                    <EasyTooltip
                        asChild
                        content={
                            <FooterButtonTooltipContent
                                content={footer.tooltip_content}
                                keystroke={footer.keystroke}
                            />
                        }
                    >
                        <Button
                            ref={setButtonRef}
                            type='button'
                            size='sm'
                            variant='ghost'
                            className='gap-2 text-sm text-card-foreground/90'
                            onClick={footer.onClick}
                        >
                            {footer.content}
                        </Button>
                    </EasyTooltip>
                </CardFooter>
            ) : null}
        </Card>
    );
}

/**
 * @function PanelCardContent
 * @description Content for panel card
 */
export function PanelCardContent({
    children,
    is_hidden,
    className,
}: PropsWithChildren<{ is_hidden?: boolean; className?: string }>) {
    return (
        <AnimatePresence>
            {!is_hidden ? (
                <motion.li
                    initial={{ opacity: 0, translateY: 0 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    exit={{ opacity: 0, translateY: '-100%', height: 0 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                        'relative flex origin-top flex-col gap-2 border-b border-accent px-2',
                        className,
                    )}
                >
                    {/** @comment Using divs with height instead of padding makes for a smoother transition */}
                    <div className='h-1' />
                    {children}
                    <div className='h-1' />
                </motion.li>
            ) : null}
        </AnimatePresence>
    );
}

/**
 * @function PanelCardContentEmpty
 * @description Empty content for panel card
 */
export function PanelCardContentEmpty({ children }: PropsWithChildren) {
    return (
        <li className='relative flex justify-start border-b border-accent px-3 py-3 text-sm text-muted-foreground'>
            {children}
        </li>
    );
}

function FooterButtonTooltipContent({
    content,
    keystroke,
}: {
    content: string;
    keystroke: IKeyCommand | null;
}) {
    return (
        <div className='flex items-center gap-2'>
            <span>{content}</span>
            {keystroke ? <KeyboardInput {...keystroke} size='sm' /> : null}
        </div>
    );
}
