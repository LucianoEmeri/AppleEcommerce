// 'use client';

// import React, { createContext, useContext, useState } from 'react';
// import IProduct from '@/interfaces/IProduct';
// import { getProductsByCategory } from '@/helpers/products.helper';

// interface ProductsContextProps {
//     products: IProduct[];
//     fetchProductsByCategory: (categoryId: number) => Promise<void>;
// }

// const ProductsContext = createContext<ProductsContextProps>({
//     products: [],
//     fetchProductsByCategory: async () => {},
// });

// export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     const [products, setProducts] = useState<IProduct[]>([]);

//     const fetchProductsByCategory = async (categoryId: number) => {
//         try {
//             const productsByCategory = await getProductsByCategory(categoryId);
//             setProducts(productsByCategory);
//         } catch (error) {
//             console.error('Error fetching products by category:', error);
//         }
//     };

//     return (
//         <ProductsContext.Provider value={{ products, fetchProductsByCategory }}>
//             {children}
//         </ProductsContext.Provider>
//     );
// };

// export const useProducts = () => useContext(ProductsContext);
