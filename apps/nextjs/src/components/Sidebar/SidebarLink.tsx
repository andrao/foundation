'use client';

import { PATHS } from '@acme/paths';
import {
    evaluateKeystroke,
    KeyboardInput,
    type IKeyCommand,
} from '@ui/components/molecules/KeyboardInput';
import { Button } from '@ui/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@ui/components/ui/tooltip';
import { cn } from '@ui/util';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, type ReactElement } from 'react';

/**
 * @function SidebarLink
 * @description Application sidebar link
 */
export function SidebarLink({
    name,
    href,
    icon,
    onClick,
    shortcut,
}: {
    name: string;
    icon: ReactElement;
    shortcut: IKeyCommand;
} & (
    | {
          href: string;
          onClick?: never;
      }
    | {
          href?: never;
          onClick: () => void;
      }
)) {
    const router = useRouter();
    const pathname = usePathname();
    const is_active =
        href && (pathname === href || (href !== PATHS.home && pathname.startsWith(href)));

    /**
     * Bind shortcut
     */
    useEffect(() => {
        // eslint-disable-next-line func-style
        const keydown = (e: KeyboardEvent) => {
            const run_cb = evaluateKeystroke(e, shortcut);

            if (run_cb) {
                e.preventDefault();
                e.stopPropagation();

                if (href) router.push(href);
            }
        };

        document.addEventListener('keydown', keydown);
        return () => document.removeEventListener('keydown', keydown);
    }, [router, href, shortcut]);

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant='ghost'
                    size='icon'
                    className={cn(
                        'rounded-lg',
                        is_active ? 'bg-card-foreground/5 hover:bg-card-foreground/10' : '',
                    )}
                    aria-label={name}
                    asChild={!!href}
                    onClick={onClick}
                >
                    {href ? <Link href={href}>{icon}</Link> : icon}
                </Button>
            </TooltipTrigger>
            <TooltipContent side='right' sideOffset={5} className='flex items-center gap-2 px-2'>
                {name}
                <KeyboardInput size='sm' {...shortcut} />
            </TooltipContent>
        </Tooltip>
    );
}
