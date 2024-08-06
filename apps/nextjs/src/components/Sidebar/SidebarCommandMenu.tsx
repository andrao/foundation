'use client';

import { PATHS } from '@acme/paths';
// import { docsConfig } from '@/config/docs';
import { evaluateKeystroke, KeyboardInput } from '@acme/ui/components/molecules/KeyboardInput';
import { Button } from '@ui/components/ui/button';
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    type CommandDialogProps,
} from '@ui/components/ui/command';
import { LaptopIcon, MoonIcon, Plus, Search, SunIcon, ZapIcon } from '@ui/icons/lucide';
import { cn } from '@ui/util';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { SidebarLink } from './SidebarLink';

/**
 * @function SidebarCommandMenu
 * @description Command/search menu
 */
export function SidebarCommandMenu({ ...props }: CommandDialogProps) {
    const { setTheme } = useTheme();
    const router = useRouter();

    /**
     * State
     * @const is_open Whether the command menu is open
     */
    const [is_open, setIsOpen] = useState(false);

    /**
     * Bind cmd+k to open the command menu
     */
    useEffect(() => {
        // eslint-disable-next-line func-style
        const keydown = (e: KeyboardEvent) => {
            const run_cb = evaluateKeystroke(e, { k: 'k', cmd: true, not_if_input: true });

            if (run_cb) {
                e.preventDefault();
                setIsOpen(open => !open);
            }
        };

        document.addEventListener('keydown', keydown);
        return () => document.removeEventListener('keydown', keydown);
    }, []);

    /**
     * @const runCommand
     * @description Run command associated with an option
     */
    const runCommand = useCallback((command: () => unknown) => {
        setIsOpen(false);
        command();
    }, []);

    return (
        <>
            <SidebarLink
                name='Search'
                onClick={() => setIsOpen(true)}
                icon={<Search className='size-5' />}
                shortcut={{ k: 'k', cmd: true }}
            />

            <CommandDialog open={is_open} onOpenChange={setIsOpen}>
                <CommandInput placeholder='Type a command or search...' />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>

                    <CommandSeparator />
                    <CommandGroup heading='Theme'>
                        <CommandItem onSelect={() => runCommand(() => setTheme('light'))}>
                            <SunIcon className='mr-2 size-4' />
                            Light
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => setTheme('dark'))}>
                            <MoonIcon className='mr-2 size-4 fill-card-foreground' />
                            Dark
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => setTheme('system'))}>
                            <LaptopIcon className='mr-2 size-4' />
                            System
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}
