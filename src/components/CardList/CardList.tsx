import React from 'react';
import Card from '../Card/Card';
import { getProductsDB } from '@/helpers/products.helper';
import Link from 'next/link';

const CardList = async () => {
    const products = await getProductsDB();

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 px-400 m-5">
            {products && products.map((product) => (
                <Link href={`/product/${product.id}`} key={product.id}>
                    <Card {...product} />
                </Link>
            ))}
        </div>
    );
};

export default CardList;
