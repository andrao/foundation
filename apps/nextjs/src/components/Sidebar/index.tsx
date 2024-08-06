import { PATHS } from '@acme/paths';
import { Button } from '@ui/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@ui/components/ui/tooltip';
import {
    BarChart3,
    Book,
    LifeBuoy,
    Settings2,
    SquareTerminal,
    SquareUser,
    Zap,
} from '@ui/icons/lucide';
import Image from 'next/image';
import Link from 'next/link';
import { SidebarCommandMenu } from './SidebarCommandMenu';
import { SidebarLink } from './SidebarLink';

/**
 * @function Sidebar
 * @description Application sidebar
 */
export function Sidebar() {
    return (
        <aside className='inset-y background-gradient-partial fixed left-0 z-40 hidden h-full w-14 flex-col border-r sm:flex'>
            <div className='flex h-14 items-center justify-center border-b p-2'>
                <Button
                    variant='outline'
                    size='icon'
                    aria-label='Home'
                    className='overflow-hidden'
                    asChild
                >
                    <Link href={PATHS.home}>
                        <Image
                            src='/favicon.ico'
                            alt='Logo'
                            width={32}
                            height={32}
                            className='size-full'
                        />
                    </Link>
                </Button>
            </div>

            <div className='flex justify-center border-b p-1'>
                <SidebarCommandMenu />
            </div>

            <nav className='grid justify-center gap-1 p-2'>
                <SidebarLink
                    name='Dashboard'
                    href={PATHS.home}
                    icon={<SquareTerminal className='size-5' />}
                    shortcut={{ k: 'h', shift: true, cmd: true }}
                />

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant='ghost'
                            size='icon'
                            className='rounded-lg'
                            aria-label='Documentation'
                        >
                            <Book className='size-5' />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side='right' sideOffset={5}>
                        Documentation
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant='ghost'
                            size='icon'
                            className='rounded-lg'
                            aria-label='Settings'
                        >
                            <Settings2 className='size-5' />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side='right' sideOffset={5}>
                        Settings
                    </TooltipContent>
                </Tooltip>
            </nav>
            <nav className='mt-auto grid gap-1 p-2'>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant='ghost'
                            size='icon'
                            className='mt-auto rounded-lg'
                            aria-label='Help'
                        >
                            <LifeBuoy className='size-5' />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side='right' sideOffset={5}>
                        Help
                    </TooltipContent>
                </Tooltip>
            </nav>
        </aside>
    );
}
