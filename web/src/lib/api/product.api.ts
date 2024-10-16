import {useQuery} from '@tanstack/react-query';
import {Product} from './dto/product.dto';

const API_BASE_URL = 'https://fakestoreapi.com';

export const fetchProducts = async (): Promise<Product[]> => {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

export const fetchProductById = async (productId: string): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
    const response = await fetch(`${API_BASE_URL}/products/category/${category}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

export const fetchCategories = async (): Promise<string[]> => {
    const response = await fetch(`${API_BASE_URL}/products/categories`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

export const useFetchProducts = () => {
    return useQuery<Product[], Error>({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });
};

export const useFetchProductById = (productId: string) => {
    return useQuery<Product, Error>({
        queryKey: ['products', productId],
        queryFn: () => fetchProductById(productId),
    });
};

export const useFetchProductsByCategory = (category: string) => {
    return useQuery<Product[], Error>({
        queryKey: ['products', category],
        queryFn: () => fetchProductsByCategory(category),
    });
};

export const useFetchProductsByCategoryOrNot = (category?: string) => {
    return useQuery<Product[], Error>({
        queryKey: ['products', category],
        queryFn: () => category ? fetchProductsByCategory(category) : fetchProducts(),
    });
};

export const useFetchCategories = () => {
    return useQuery<string[], Error>({
        queryKey: ['categories'],
        queryFn: fetchCategories,
    });
};

export const searchProducts = async (query: string): Promise<Product[]> => {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const products: Product[] = await response.json();

    return products.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase())
    );
};

export const useSearchProducts = (query: string) => {
    return useQuery<Product[], Error>({
        queryKey: ['searchProducts', query],
        queryFn: () => searchProducts(query),
        enabled: !!query,
    });
};