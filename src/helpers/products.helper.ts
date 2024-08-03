import IProduct from "@/interfaces/IProduct";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export async function getProductsDB(): Promise<IProduct[]> {
    try {
        const res = await fetch(`${APIURL}/products`, {
            next: { revalidate: 3600 }
        });

        if (!res.ok) {
            throw new Error(`Error fetching products: ${res.statusText}`);
        }

        const products: IProduct[] = await res.json();
        return products;
    } catch (error: any) {
        console.error("Error fetching products from DB:", error);
        throw new Error(`Failed to fetch products from DB: ${error.message}`);
    }
};

export async function getProductsById(id: string): Promise<IProduct> {
    try {
        const products: IProduct[] = await getProductsDB();
        const productFiltered = products.find((product) => product.id.toString() === id);

        if (!productFiltered) {
            throw new Error(`Product with ID ${id} not found`);
        }

        return productFiltered;
    } catch (error: any) {
        console.error("Error fetching product by ID:", error);
        throw new Error(`Failed to fetch product by ID: ${error.message}`);
    }
};

export async function getProductsByCategory(categoryId: number): Promise<IProduct[]> {
    try {
        if (isNaN(categoryId)) {
            throw new Error('Invalid category ID');
        }

        const products: IProduct[] = await getProductsDB();
        const productsByCategory = products.filter((product) => product.categoryId === categoryId);

        if (productsByCategory.length === 0) {
            throw new Error(`No products found for category ID ${categoryId}`);
        }

        return productsByCategory;
    } catch (error: any) {
        console.error("Error fetching products by category:", error);
        throw new Error(`Failed to fetch products by category: ${error.message}`);
    }
};
