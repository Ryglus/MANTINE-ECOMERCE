import { useQuery } from '@tanstack/react-query';
import { Product } from './dto/product.dto';

const API_BASE_URL = 'https://fakestoreapi.com';

// Fetch all products
export const fetchProducts = async (): Promise<Product[]> => {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data: Product[] = await response.json();
    return data;
};

// Fetch a product by ID
export const fetchProductById = async (productId: string): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

// Hook to fetch all products
export const useFetchProducts = () => {
    return useQuery<Product[], Error>({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });
};

// Hook to fetch a product by ID
export const useFetchProductById = (productId: string) => {
    return useQuery<Product, Error>({
        queryKey: ['product', productId],
        queryFn: () => fetchProductById(productId),
    });
};
