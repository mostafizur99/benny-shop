import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import useSWR from 'swr';
import shootFireworks from '../lib/shoot-fireworks';
import { fetcher } from '../src/utils/axiosKits';

const SuccessPage = () => {
    const {
        query: { session_id },
    } = useRouter();

    const { data, error } = useSWR(() => `/api/checkout_sessions/${session_id}`, fetcher);

    useEffect(() => {
        if (data) {
            shootFireworks();
        }
    }, [data]);


    return (
        <>
            <Head>
                <title>Successful Order</title>
            </Head>
            <div className='text-center py-10'>
                <h4>Order Successful!!</h4>
                <h3>Thanks For Your Order!</h3>
            </div>
        </>
    )
}

export default SuccessPage