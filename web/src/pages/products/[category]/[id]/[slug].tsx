import { Loader, Text, Badge, Group, Image, Title, Space, Grid, Card } from '@mantine/core';
import { useParams } from "../../../../router";
import { extractProductIdFromSlug } from "../../../../utils/urlBuilder";
import { useFetchProductById } from "../../../../lib/api/product.api";
import ProductDetailLayout from "./_layout/product-detail-layout";

export default function ProductDetailPage() {
    const { category, id } = useParams('/products/:category/:id/:slug');
    const productId = extractProductIdFromSlug(id);
    const { data: product, isLoading, error } = useFetchProductById(productId?.toString() ?? '');

    if (isLoading) return <ProductDetailLayout><Loader className={"content-center"} /></ProductDetailLayout>;
    if (error || !productId) return <div>Error fetching product details</div>;

    return (
        <ProductDetailLayout>
                <Card shadow="md" radius="lg" p="xl" withBorder>
                    <Grid>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Image
                                src={product?.image}
                                alt={product?.title}
                                height={500}
                                fit="contain"
                                radius="md"
                                className="shadow-md"
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Group p="apart" align="center">
                                <Badge color="pink" size="lg">{category}</Badge>
                                <Badge color="green" size="lg">${product?.price}</Badge>
                            </Group>

                            <Title order={1} size="h2" fw={700} mt="md">
                                {product?.title}
                            </Title>

                            <Text size="lg" fw={500} c="dimmed" className="line-clamp-3" mt="sm">
                                {product?.description}
                            </Text>

                            <Space h="xl" />
                            <Group mt="lg">
                                <Badge variant="outline" color="blue">In Stock</Badge>
                                <Badge variant="outline" color="yellow">Free Shipping</Badge>
                            </Group>
                        </Grid.Col>
                    </Grid>
                </Card>
        </ProductDetailLayout>
    );
}
