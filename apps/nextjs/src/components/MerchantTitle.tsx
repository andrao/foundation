import { getMerchantHref } from '~/util/getMerchantHref';

export function MerchantTitle({
    merchant,
}: {
    merchant: {
        name: string;
        merchant_id: number;
    };
}) {
    const { name, merchant_id } = merchant;
    const href = getMerchantHref({ merchant_id });

    return (
        <h1 className='mb-8 text-center'>
            <a
                href={href}
                className='bg-300% bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text bg-center text-6xl font-bold leading-normal text-transparent hover:underline'
            >
                {name}
            </a>
        </h1>
    );
}
