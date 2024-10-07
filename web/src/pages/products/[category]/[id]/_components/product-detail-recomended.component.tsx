
import { Loader, Text, Card, Group, Image, Badge } from "@mantine/core";
import { Link } from "react-router-dom";
import {useFetchProductsByCategory} from "../../../../../lib/api/product.api";
import {buildProductUrl} from "../../../../../utils/urlBuilder";


interface ProductDetailRecommendedProps {
    category: string | null;
    currentProductId: number | null;
}

export default function ProductDetailRecommended({
                                                     category,
                                                     currentProductId,
                                                 }: ProductDetailRecommendedProps) {
    //@ts-ignore
    const { data: products, isLoading, error } = useFetchProductsByCategory(category);

    if (isLoading) return <Loader />;
    if (error) return <div>Error loading recommended products</div>;

    const recommendedProducts = products?.filter(
        (product) => product.id !== currentProductId
    );

    return (
        <Card className="mt-8">
            <Text size="lg" fw={700} className="mb-4">
                More from {category}
            </Text>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {recommendedProducts?.map((product) => (
                    <Card
                        key={product.id}
                        shadow="md"
                        radius="md"
                        withBorder
                        className="relative overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-lg"
                    >
                        <div className="relative h-[200px] flex items-center justify-center overflow-hidden rounded-md">
                            <Badge
                                color="pink"
                                variant="filled"
                                className="absolute top-2 left-2"
                            >
                                {product.category}
                            </Badge>
                            <Image
                                src={product.image}
                                alt={product.title}
                                fit="cover"
                                height={200}
                                radius="md"
                            />
                        </div>

                        <div className="relative z-10 flex flex-col justify-between mt-2">
                            <Group p="apart" mb="xs">
                                <Text fw={500} className="text-lg font-semibold" title={product.title}>
                                    {product.title}
                                </Text>
                            </Group>
                            <Text fw={700} size="lg" c="green">
                                ${product.price}
                            </Text>
                        </div>

                        <Link to={buildProductUrl(product.category, product.id, product.title)} className="absolute inset-0 z-20" />
                    </Card>
                ))}
            </div>
        </Card>
    );
}
