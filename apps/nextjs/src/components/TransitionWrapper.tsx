'use client';

import { motion } from 'framer-motion';
import type { PropsWithChildren } from 'react';

export function TransitionWrapper({
    children,
    className,
}: PropsWithChildren<{ className?: string }>) {
    return (
        <motion.div
            initial={{
                // x: 300,
                opacity: 0,
            }}
            animate={{
                // x: 0,
                opacity: 1,
            }}
            exit={{
                // x: 300,
                opacity: 0,
            }}
            transition={{
                // type: 'spring',
                // stiffness: 260,
                // damping: 20,
                type: 'tween',
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
