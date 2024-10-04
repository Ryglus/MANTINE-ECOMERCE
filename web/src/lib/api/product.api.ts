import { useQuery } from '@tanstack/react-query';
import { Product } from './dto/product.dto';

export const fetchProducts = async (): Promise<Product[]> => {
    const response = await fetch('https://fakestoreapi.com/products');
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
