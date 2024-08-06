import { Header } from '~/components/Header';
import { Sidebar } from '~/components/Sidebar';

/**
 * @function HomePage
 */
export default function HomePage() {
    return (
        <div className='min-h-screen w-full bg-muted/40 sm:pl-14'>
            <Sidebar />
            <div className='flex flex-col pb-4 sm:gap-2'>
                <Header />
                <main className='grid flex-1 grid-cols-1 gap-1 pt-4 xl:grid-cols-5'></main>
            </div>
        </div>
    );
}
