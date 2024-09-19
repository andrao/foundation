import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { buttonVariants, type ButtonProps } from '@ui/components/ui/button';
import { cn } from '@ui/util';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import * as React from 'react';

/* eslint-disable func-style */

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
    <nav
        role='navigation'
        aria-label='pagination'
        className={cn('mx-auto flex w-full justify-center', className)}
        {...props}
    />
);
Pagination.displayName = 'Pagination';

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(
    ({ className, ...props }, ref) => (
        <ul ref={ref} className={cn('flex flex-row items-center gap-1', className)} {...props} />
    ),
);
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(
    ({ className, ...props }, ref) => <li ref={ref} className={cn('', className)} {...props} />,
);
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
    isActive?: boolean;
} & Pick<ButtonProps, 'size'> &
    React.ComponentProps<'button'>;

const PaginationLink = ({ className, isActive, size = 'icon', ...props }: PaginationLinkProps) => (
    <button
        type='button'
        aria-current={isActive ? 'page' : undefined}
        className={cn(
            buttonVariants({
                variant: isActive ? 'outline' : 'ghost',
                size,
            }),
            className,
        )}
        {...props}
    />
);
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = ({
    className,
    hide_text = false,
    ...props
}: React.ComponentProps<typeof PaginationLink> & { hide_text?: boolean }) => (
    <PaginationLink
        aria-label='Go to previous page'
        size='default'
        className={cn('gap-1 px-2.5', !hide_text ? 'md:pr-4' : undefined, className)}
        {...props}
    >
        <ChevronLeftIcon className='size-4' />
        <span className={`sr-only ${hide_text ? '' : 'md:not-sr-only'}`}>Previous</span>
    </PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({
    className,
    hide_text = false,
    ...props
}: React.ComponentProps<typeof PaginationLink> & { hide_text?: boolean }) => (
    <PaginationLink
        aria-label='Go to next page'
        size='default'
        className={cn('gap-1 px-2.5', !hide_text ? 'md:pl-4' : undefined, className)}
        {...props}
    >
        <span className={`sr-only ${hide_text ? '' : 'md:not-sr-only'}`}>Next</span>
        <ChevronRightIcon className='size-4' />
    </PaginationLink>
);
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => (
    <span
        aria-hidden
        className={cn('flex h-9 w-9 items-center justify-center', className)}
        {...props}
    >
        <DotsHorizontalIcon className='size-4' />
        <span className='sr-only'>More pages</span>
    </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
    Pagination,
    PaginationContent,
    PaginationLink,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
};
