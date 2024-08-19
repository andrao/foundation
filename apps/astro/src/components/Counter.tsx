import { useState } from 'react';

export function Counter() {
    const [count, setCount] = useState(0);

    return (
        <>
            <li className='link-card'>
                <button onClick={() => setCount(count + 1)}>Count: {count}</button>
            </li>
        </>
    );
}
