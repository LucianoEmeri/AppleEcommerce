'use client';

import Card from '@/components/Card/Card';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

const Dynamic = ({ params }: { params: { categoryId: string } }) => {
    const { products, setProductsByCategory } = useAuth();
    const { categoryId } = params;

    useEffect(() => {
        if (categoryId) {
            // Asegúrate de que categoryId sea un número
            setProductsByCategory(Number(categoryId));
        }
    }, [categoryId, setProductsByCategory]);

    return (
        <div className='grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:px-24 2xl:px-32 mt-5 mb-5'>
            {products && products.length > 0 ? (
                products.map((product) => (
                    <Link href={`/product/${product.id}`} key={product.id}>
                        <Card {...product} />
                    </Link>
                ))
            ) : (
                <div className="col-span-full text-center">
                    <p>No products found in this category.</p>
                </div>
            )}
        </div>
    );
};

export default Dynamic;
