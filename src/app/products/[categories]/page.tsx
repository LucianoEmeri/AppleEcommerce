import { getProductsByCategory } from '@/helpers/products.helper';
import React from 'react';
import Card from '@/components/Card/Card';
import { useRouter } from 'next/router';

const Dynamic = async ({ params }: { params: { categoryId: string } }) => {
  const { categoryId } = params;
  const numericCategoryId = Number(categoryId);

  if (isNaN(numericCategoryId) || numericCategoryId <= 0) {
    // Manejar caso en el que categoryId no es válido
    return <div className="text-center text-red-500">La categoría seleccionada no es válida.</div>;
  }

  try {
    const products = await getProductsByCategory(numericCategoryId);
    return (
      <div className='grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:px-24 2xl:px-32 mt-5 mb-5'>
        {products.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id}>
            <Card {...product} />
          </Link>
        ))}
      </div>
    );
  } catch (error) {
    return <div className="text-center text-red-500">No se pudieron cargar los productos para esta categoría.</div>;
  }
}

export default Dynamic;
