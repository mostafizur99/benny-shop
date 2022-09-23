import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import getStripe from '../lib/get-stripe'
import Layout from '../src/components/layouts/Layout'
import productsData from '../src/data/products'

const Cart = () => {
    const myProducts = productsData

    const redirectToCheckout = async () => {
        const { data: { id } } = await axios.post('/api/checkout_sessions', {
            items: [{
                price: myProducts[0].id,
                quantity: 1
            },
            {
                price: myProducts[1].id,
                quantity: 2
            }
            ]
        });

        // Redirect to checkout
        const stripe = await getStripe();
        await stripe.redirectToCheckout({ sessionId: id });
    };

    return (
        <>
            <Head>
                <title>Cart Page</title>
            </Head>

            <Layout>
                <section className='py-10'>
                    <div className='container mx-auto'>
                        <div className='flex space-x-4'>
                            <div className='w-4/6  shadow p-4'>
                                {
                                    [1, 2, 3].map((item, index) => (
                                        <div key={index} className='flex items-center justify-between'>
                                            <Link href={'#'}>
                                                <a className='flex items-center group overflow-hidden'>
                                                    <div className='relative w-20 h-20'>
                                                        <Image
                                                            src="/img/products/product1.jpg"
                                                            alt='product-image'
                                                            className=""
                                                            layout="fill"
                                                            objectFit="contain"
                                                        />
                                                    </div>
                                                    <h4 className='ml-4 text-md font-semibold  group-hover:text-cyan-400 transition'>Product Title</h4>
                                                </a>
                                            </Link>
                                            <div className='flex items-center'>
                                                <div className='flex mr-6'>
                                                    <button>+</button>
                                                    <p>1</p>
                                                    <button>-</button>
                                                </div>
                                                <p>$210</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='w-2/6 justify-between shadow p-4'>
                                <h4 className='pb-6 font-bold flex justify-between'> <span>Total:</span> <span>$350</span></h4>
                                <button className=' w-full px-5 py-3  rounded font-medium bg-cyan-500'
                                    onClick={redirectToCheckout}
                                >Checkout</button>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    )
}

export default Cart