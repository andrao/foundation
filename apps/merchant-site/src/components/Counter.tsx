import { useState } from 'react';

function Button({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
    return (
        <button onClick={onClick} style={{ padding: '10px 20px', margin: '5px' }}>
            {children}
        </button>
    );
}

export function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <h2>Count: {count}</h2>
            <Button onClick={() => setCount(prevCount => prevCount + 1)}>Increment</Button>
            <Button onClick={() => setCount(prevCount => prevCount - 1)}>Decrement</Button>
            <Button onClick={() => setCount(0)}>Reset</Button>
        </div>
    );
}
