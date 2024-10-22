import {Container, Loader, Text, Title} from '@mantine/core';
import {useFetchProductsByCategory} from '../lib/api/product.api';
import ProductCard from './cards/product.card';

interface ProductDetailRecommendedProps {
    title?: string;
    category: string;
    currentProductId?: number;
    size?: 'sm' | 'md' | 'lg';
}

export default function ProductRecommendedSection(
    {
        title,
        category,
        currentProductId,
        size = 'md',
    }: ProductDetailRecommendedProps) {

    const { data: products, isLoading, error } = useFetchProductsByCategory(category);

    const recommendedProducts = products?.filter(
        (product) => product.id !== currentProductId
    );

    if (isLoading) return <Loader />;
    if (error) return <Text c="red">Error loading recommended products</Text>;
    return (
        <Container size="xl" my="lg">
            {title ? (
                <Title fw={400} mb="md">
                    {title.toUpperCase()}
                </Title>
            ) : (
                <Text size="lg" fw={700} mb="md">
                    More from {category}
                </Text>
            )}

            {size === 'lg' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {recommendedProducts?.[0] && (
                        <ProductCard size="lg" product={recommendedProducts[0]} />
                    )}
                    <div className="grid grid-cols-2 gap-4">
                        {recommendedProducts
                            ?.slice(1, 5)
                            .map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                    </div>
                </div>
            )}

            {size === 'md' && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {recommendedProducts?.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}

            {size === 'sm' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {recommendedProducts?.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </Container>
    );
}
