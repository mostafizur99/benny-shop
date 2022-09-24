import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useShoppingCart } from '../../../hooks/use-cart';

const ProductCard = ({ productItem }) => {
    const { cartCount, addCartItem } = useShoppingCart();

    const handleOnAddToCart = () => {
        addCartItem(productItem);
    }

    return (
        <div className='border rounded-md'>
            <div className="relative w-full h-60 rounded-t-md overflow-hidden">
                <Image
                    src="/img/products/product1.jpg"
                    alt='product-image'
                    layout="fill"
                    objectFit="contain"
                />
            </div>
            <div className='p-4'>
                <Link href={'#'}>
                    <a className='font-semibold text-lg hover:text-cyan-500 hover:transition-all'>
                        <h3>{productItem?.title}</h3>
                    </a>
                </Link>
                <div className='flex items-center justify-between mt-3'>
                    <span className='font-medium'>${productItem?.price}</span>
                    <button
                        onClick={handleOnAddToCart}
                        className='px-3 py-2 rounded font-medium bg-cyan-400 hover:bg-cyan-500 hover:transition-all'
                    >Add To Cart</button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard