import { CommandMenu } from './CommandMenu';
import { MobileMenu } from './MobileMenu';
import { UserButton } from './UserButton';

/**
 * @function Header
 * @description Page header
 */
export function Header() {
    return (
        <header className='sticky top-0 z-30 flex items-center gap-4 border-b px-4 py-4 sm:static sm:h-auto sm:border-0 sm:px-6'>
            <MobileMenu />

            {/* Breadcrumbs */}
            {/* <div className='hidden sm:flex'><HeaderBreadcrumb /></div> */}

            {/* Search */}
            <div className='relative ml-auto flex-1 sm:grow-0'>
                <CommandMenu />
            </div>

            {/* User menu */}
            <UserButton />
        </header>
    );
}
