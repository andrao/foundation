import { getMerchant } from '@acme/db-api';
import { Counter } from '~/components/Counter';
import { MerchantTitle } from '~/components/MerchantTitle';
import { ServiceList } from '~/components/ServiceList';
import { ctx } from '~/ctx';
import { getStaticMerchants } from '~/util/getStaticMerchants';

/**
 * Get path parameters
 */
export async function generateStaticParams() {
    const merchant_ids = await getStaticMerchants();

    return merchant_ids.map(merchant_id => ({ merchant_id }));
}

type IParams = Awaited<ReturnType<typeof generateStaticParams>>[number];

/**
 * Render page
 */
export default async function Page({ params }: { params: IParams }) {
    const merchant_id = parseInt(params.merchant_id);

    const { name } = await getMerchant({
        merchant_id: merchant_id,
        columns: { name: true },
        ctx,
    });

    const merchant = { merchant_id, name };

    return (
        <main className='mx-auto w-full max-w-3xl p-4 text-xl'>
            <MerchantTitle merchant={merchant} />
            <ServiceList merchant_id={merchant_id} />

            {/* Conditionally render component based on merchant property */}
            {merchant.merchant_id === 2 ? <Counter /> : null}
        </main>
    );
}
