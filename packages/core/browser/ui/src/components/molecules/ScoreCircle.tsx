'use client';

import { cn } from '@ui/util';
import { motion } from 'framer-motion';

const LINEAR_GRADIENT_ID = 'rainbowGradient';

/**
 * @function ScoreCircle
 * @description Proportionately filled circle based on a percentage
 */
export function ScoreCircle({
    percentage: input_percentage,
    className,
    stroke_width,
}: {
    percentage: number;
    className?: string;
    stroke_width: number;
}) {
    const percentage = input_percentage >= 100 ? 99.9 : input_percentage;

    const cx = 100; // circle centre x
    const cy = 100; // circle centre y
    const r = 90; // circle radius

    // Convert percentage to end angle in radians
    const end_angle = ((360 * percentage) / 100 - 90) * (Math.PI / 180);

    // Calculate end point of the arc
    const end_x = cx + r * Math.cos(end_angle);
    const end_y = cy + r * Math.sin(end_angle);

    // Flags for SVG arc path
    const large_arc_flag = percentage > 50 ? 1 : 0;
    const sweep_flag = 1; // Assuming the positive direction (clockwise)

    // SVG path data
    const path_data = `M ${cx},${cy - r} A ${r},${r} 0 ${large_arc_flag} ${sweep_flag} ${end_x},${end_y}`;

    // Stroke colour
    const stroke =
        percentage >= 90
            ? 'stroke-green-600'
            : percentage >= 75
              ? 'stroke-yellow-500'
              : 'dark:stroke-red-600 stroke-red-700';

    const transition_duration = Math.round(((0.7 * percentage) / 100) * 100) / 100;

    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 200 200'
            strokeLinecap='round'
            className={cn('fill-none', stroke, className)}
        >
            <defs>
                <linearGradient id={LINEAR_GRADIENT_ID} x1='0%' y1='0%' x2='100%' y2='100%'>
                    <stop offset='0%' stopColor='red' />
                    <stop offset='16.66%' stopColor='orange' />
                    <stop offset='33.33%' stopColor='yellow' />
                    <stop offset='50%' stopColor='green' />
                    <stop offset='66.66%' stopColor='blue' />
                    <stop offset='83.33%' stopColor='indigo' />
                    <stop offset='100%' stopColor='violet' />
                </linearGradient>
            </defs>

            <motion.path
                d={path_data}
                stroke={input_percentage >= 100 ? `url(#${LINEAR_GRADIENT_ID})` : undefined}
                strokeWidth={stroke_width}
                variants={{
                    hidden: { pathLength: 0 },
                    visible: { pathLength: 1 },
                }}
                initial='hidden'
                animate='visible'
                transition={{ duration: transition_duration }}
            />
        </svg>
    );
}
