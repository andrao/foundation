import { useState } from 'react';

function Button({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
    return (
        <button
            onClick={onClick}
            className='m-1.5 rounded-md bg-primary px-3 py-1.5 text-primary-foreground hover:bg-primary/90'
        >
            {children}
        </button>
    );
}

export function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div className='mt-4 rounded-md border p-4'>
            <h2>Count: {count}</h2>
            <Button onClick={() => setCount(prevCount => prevCount + 1)}>Increment</Button>
            <Button onClick={() => setCount(prevCount => prevCount - 1)}>Decrement</Button>
            <Button onClick={() => setCount(0)}>Reset</Button>
        </div>
    );
}
