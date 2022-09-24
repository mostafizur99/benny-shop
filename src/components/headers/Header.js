import Link from 'next/link'
import React from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { useShoppingCart } from '../../../hooks/use-cart';

const Header = () => {
    const { totalPrice, cartCount } = useShoppingCart();

    return (
        <section className='py-4 shadow-md'>
            <div className='container mx-auto'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center justify-start'>
                        <h3 className='text-3xl font-bold text-cyan-500 italic'>BennyShop</h3>
                        <div className='ml-7'>
                            <Link href={'/'} passHref>
                                <a className='px-3 py-2 font-medium text-slate-600 hover:text-cyan-500 hover:transition-all'>Home</a>
                            </Link>
                            <Link href={'/'} passHref>
                                <a className='px-3 py-2 font-medium text-slate-600 hover:text-cyan-500 hover:transition-all'>Shop</a>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <Link href={'/cart'} passHref>
                            <a className='text-md font-medium text-slate-600 hover:text-cyan-500 hover:transition-all flex items-center group'>
                                <FaShoppingCart />
                                <span className='ml-2'>${totalPrice} <span className='text-sm text-slate-400 group-hover:text-cyan-500'>({cartCount})</span></span>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Header