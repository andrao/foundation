import './LoadingIndicator.scss';

/**
 * @function LoadingIndicator
 * @description Loading spinner, or wave
 */
export function LoadingIndicator(props?: { className?: string; variant?: 'circular' | 'wave' }) {
    const variant = props?.variant ?? 'circular';

    return variant === 'circular' ? (
        <CircularLoadingIndicator {...props} />
    ) : (
        <WaveLoadingIndicator {...props} />
    );
}

function CircularLoadingIndicator(props?: { className?: string }) {
    return <span className={`CircularLoadingIndicator ${props?.className ?? ''}`} />;
}

function WaveLoadingIndicator(props?: { className?: string }) {
    return (
        <div className={`WaveLoadingIndicator ${props?.className ?? ''}`}>
            <div className='obj bg-black dark:bg-white' />
            <div className='obj bg-black dark:bg-white' />
            <div className='obj bg-black dark:bg-white' />
            <div className='obj bg-black dark:bg-white' />
            <div className='obj bg-black dark:bg-white' />
            <div className='obj bg-black dark:bg-white' />
            <div className='obj bg-black dark:bg-white' />
            <div className='obj bg-black dark:bg-white' />
        </div>
    );
}
