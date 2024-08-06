'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '@ui/util';
import * as React from 'react';

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
    React.ElementRef<typeof TooltipPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
    <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
            'z-50 overflow-hidden rounded-md border border-input bg-card px-3 py-1.5 text-xs text-card-foreground shadow-sm animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            className,
        )}
        {...props}
    />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };

/**
 * @function EasyTooltip
 * @description Tooltip wrapper that incorporates all necessary components in an easy interface
 * @see https://www.radix-ui.com/primitives/docs/components/tooltip
 */
export function EasyTooltip({
    children,
    content,
    asChild = false,
    className = '',
    contentClassName = '',
    contentStyle = {},
    delayDuration = 300,
    open,
    side = 'bottom',
    tabIndex,
}: React.PropsWithChildren<{
    content: string | JSX.Element;
    asChild?: boolean;
    className?: string;
    contentClassName?: string;
    contentStyle?: React.CSSProperties;
    delayDuration?: number;
    open?: boolean;
    side?: TooltipPrimitive.TooltipContentProps['side'];
    tabIndex?: number;
}>) {
    return (
        <Tooltip open={open} delayDuration={delayDuration}>
            <TooltipTrigger
                asChild={asChild}
                className={className}
                tabIndex={tabIndex}
                type='button'
            >
                {children}
            </TooltipTrigger>
            <TooltipContent side={side} className={contentClassName} style={contentStyle}>
                {typeof content === 'string' ? <p>{content}</p> : content}
            </TooltipContent>
        </Tooltip>
    );
}
