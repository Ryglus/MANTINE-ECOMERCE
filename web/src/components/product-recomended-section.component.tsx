import {Container, Loader, Text, Title} from "@mantine/core";
import {useFetchProductsByCategory} from "../lib/api/product.api";
import ProductCard from "./_cards/product.card";

interface ProductDetailRecommendedProps {
    title?: string;
    category: string;
    currentProductId?: number;
    size?: "sm" | "md" | "lg";
}

export default function ProductRecommendedSection({
                                                      title,
                                                      category,
                                                      currentProductId,
                                                      size = "md",
                                                  }: ProductDetailRecommendedProps) {
    const { data: products, isLoading, error } = useFetchProductsByCategory(category);

    if (isLoading) return <Loader />;
    if (error) return <div>Error loading recommended products</div>;

    const recommendedProducts = products?.filter(
        (product) => product.id !== currentProductId
    );

    return (
        <Container size={"xl"} className="my-6">
            {title ? (
                <Title fw={400} className="mb-2">
                    {title.toUpperCase()}
                </Title>
            ) : (
                <Text size="lg" fw={700} className="mb-4">
                    More from {category}
                </Text>
            )}
            {size === "lg" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        {recommendedProducts?.[0] && (
                            <ProductCard size={"lg"} product={recommendedProducts[0]} />
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {recommendedProducts
                            ?.slice(1, 5)
                            .map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                    </div>
                </div>
            )}

            {size === "md" && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {recommendedProducts?.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}

            {size === "sm" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {recommendedProducts?.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </Container>
    );
}
