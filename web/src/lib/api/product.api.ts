import { useQuery } from '@tanstack/react-query';
import { Product } from './dto/product.dto';

const API_BASE_URL = 'https://fakestoreapi.com';


export const fetchProducts = async (): Promise<Product[]> => {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data: Product[] = await response.json();
    return data;
};

export const useFetchProducts = () => {
    return useQuery<Product[], Error>({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });
};

export const fetchProductById = async (productId: number): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};