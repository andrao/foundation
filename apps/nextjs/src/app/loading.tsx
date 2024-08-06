import { LoadingIndicator } from '@ui/components/molecules/LoadingIndicator';

/**
 * @function Loading
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/loading
 */
export default function Loading() {
    return (
        <div className='background-gradient-partial flex min-h-screen flex-1 items-center justify-center'>
            <LoadingIndicator />
        </div>
    );
}
