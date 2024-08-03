import Card from '@/components/Card/Card';
import { getProductsByCategory } from '@/helpers/products.helper';
import Link from 'next/link';
import React from 'react';

const Dynamic = async ({params}: {params: {categoryId: string}}) => {
    const {categories} = params;
    const products = await getProductsByCategory(Number(categories));
    return (
        <div className='grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:px-24 2xl:px-32 mt-5 mb-5'>
            {products && products.map((product) => (
                <Link href={`/product/${product.id}`} key={product.id}>
                    <Card {...product} />
                </Link>
            ))}
        </div>
    )
}

export default Dynamic;
