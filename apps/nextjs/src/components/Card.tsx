import React from 'react';

export function Card({ href, title, body }: { href: string; title: string; body?: string }) {
    return (
        <li className='flex list-none rounded-lg bg-[#23262d] bg-[position:100%] p-px shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] transition-[background-position] duration-500 ease-in-out hover:bg-[image:var(--accent-gradient)] hover:bg-[length:400%] hover:bg-[position:0]'>
            <a
                href={href}
                className='w-full rounded-lg bg-[#23262d] p-[calc(1.5rem-1px)] leading-[1.4] no-underline opacity-80'
            >
                <h2 className='m-0 text-xl text-white transition-colors duration-500 ease-in-out'>
                    {title}
                    <span>&rarr;</span>
                </h2>

                {body && <p className='mb-0 mt-2 text-sm text-accent'>{body}</p>}
            </a>
        </li>
    );
}
