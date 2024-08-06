import { PATHS } from '@acme/paths';
import { Button } from '@ui/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@ui/components/ui/sheet';
import {
    BarChart3,
    Book,
    LifeBuoy,
    PanelLeft,
    Settings2,
    SquareTerminal,
    SquareUser,
    Zap,
} from '@ui/icons/lucide';
import Image from 'next/image';
import Link from 'next/link';

/**
 * @function MobileMenu
 * @description Menu for mobile devices
 */
export function MobileMenu() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size='icon' variant='outline' className='sm:hidden'>
                    <PanelLeft className='size-5' />
                    <span className='sr-only'>Toggle Menu</span>
                </Button>
            </SheetTrigger>

            <SheetContent side='left' className='sm:max-w-xs'>
                <nav className='grid gap-6 text-lg font-medium'>
                    <Link
                        href={PATHS.home}
                        // className='group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base'
                    >
                        <Image
                            src='/favicon.ico'
                            alt='Logo'
                            width={32}
                            height={32}
                            className='size-8'
                        />
                        <span className='sr-only'>Dashboard</span>
                    </Link>

                    <Link
                        href={PATHS.home}
                        className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                    >
                        <SquareTerminal className='size-5' />
                        Dashboard
                    </Link>

                    <Link
                        href='#'
                        className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                    >
                        <Book className='size-5' />
                        Documentation
                    </Link>

                    <Link
                        href='#'
                        className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                    >
                        <Settings2 className='size-5' />
                        Settings
                    </Link>

                    <Link
                        href='#'
                        className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                    >
                        <LifeBuoy className='size-5' />
                        Help
                    </Link>

                    <Link
                        href='#'
                        className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                    >
                        <SquareUser className='size-5' />
                        Account
                    </Link>
                </nav>
            </SheetContent>
        </Sheet>
    );
}
