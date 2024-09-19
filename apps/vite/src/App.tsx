import { api } from '@acme/basic-api-client';
import { useEffect, useState } from 'react';
import './App.css';
import viteLogo from '/vite.svg';
import reactLogo from './assets/react.svg';

/**
 * @function App
 * @description Main application component
 */
export default function App() {
    const [count, setCount] = useState(0);
    const [message, setMessage] = useState<string | undefined>();

    /**
     * Fetch the protected message
     */
    const {
        data,
        isLoading: is_loading,
        error,
    } = api.browser.basic.getProtectedMessage.useQuery({ n: count });

    /**
     * Update the message with a new response
     */
    useEffect(() => {
        const msg = error?.message ? `Error: ${error.message}` : data;
        if (error) console.error(error);

        if (msg) setMessage(msg);
    }, [data, error]);

    return (
        <>
            <div>
                <a href='https://vitejs.dev' target='_blank' rel='noreferrer'>
                    <img src={viteLogo} className='logo' alt='Vite logo' />
                </a>
                <a href='https://react.dev' target='_blank' rel='noreferrer'>
                    <img src={reactLogo} className='logo react' alt='React logo' />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className='card'>
                <button onClick={() => setCount(c => c + 1)}>count is {count}</button>

                <p>
                    <strong>Server response:&nbsp;</strong>
                    <span>{message ? message : is_loading ? 'loading...' : 'waiting...'}</span>
                </p>
            </div>

            <p className='read-the-docs'>
                Edit <code>src/App.tsx</code> and save to test HMR.
            </p>
            <p className='read-the-docs'>Click on the Vite and React logos to learn more!</p>
        </>
    );
}
