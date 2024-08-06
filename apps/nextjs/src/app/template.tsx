'use client';

import { TransitionWrapper } from '~/components/TransitionWrapper';
import type { PropsWithChildren } from 'react';

/**
 * @function Template
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#templates
 */
export default function Template(props: PropsWithChildren) {
    return <TransitionWrapper>{props.children}</TransitionWrapper>;
}
