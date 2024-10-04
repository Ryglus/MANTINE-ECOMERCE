import { useFetchProducts } from "../../../lib/api/product.api";
import { Container, Loader, Text, Card, Badge, Group } from "@mantine/core";
import { Link } from "react-router-dom";
import { buildProductUrl } from "../../../utils/urlBuilder";
import { useProductBackgroundColors } from "../../../hooks/useProductBackgroundColors";

export default function ProductShowcase() {
    const { data: products, isLoading, error } = useFetchProducts();
    const backgroundColors = useProductBackgroundColors(products);

    if (isLoading) return <Loader />;
    if (error) return <div>Error fetching products</div>;

    return (
        <Container className="mt-5 min-h-dvh">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products?.map((product) => (
                    <Card
                        key={product.id}
                        shadow="md"
                        radius="md"
                        withBorder
                        className="relative overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-lg"
                        style={{ height: "100%" }}
                    >
                        <div
                            className="relative h-[300px] flex items-center justify-center overflow-hidden rounded-md"
                            style={{
                                background: backgroundColors[product.id] || '#f5f5f5',
                            }}
                        >
                            <Badge
                                color="pink"
                                variant="filled"
                                className="absolute top-2 left-2"
                            >
                                {product.category}
                            </Badge>
                            <img
                                src={product.image}
                                alt={product.title}
                                className="object-contain h-full w-full"
                            />
                            <Badge color="green" variant="filled" className="absolute bottom-2 right-2 text-lg">
                                ${product.price}
                            </Badge>
                        </div>

                        <div className="relative z-10 flex flex-col justify-between">
                            <Group p="apart" mt="auto" mb="xs">
                                <Text fw={500} className="text-lg font-semibold line-clamp-2" title={product.title}>
                                    {product.title}
                                </Text>
                            </Group>
                        </div>

                        <Link to={buildProductUrl(product.category, product.id, product.title)} className="absolute inset-0 z-20" />
                    </Card>
                ))}
            </div>
        </Container>
    );
}
