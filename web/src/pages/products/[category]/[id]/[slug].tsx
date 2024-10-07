import { Loader, Text, Badge, Group, Title, Space, Grid, Card, Divider, Button, Rating, NumberInput } from '@mantine/core';
import { IconBookmark, IconShoppingCart } from '@tabler/icons-react';
import { useParams } from "../../../../router";
import { extractProductIdFromSlug } from "../../../../utils/urlBuilder";
import { useFetchProductById } from "../../../../lib/api/product.api";
import ProductDetailLayout from "./_layout/product-detail-layout";
import ProductDetailRecommended from "./_components/product-detail-recomended.component";
import ProductDetailCarousel from './_components/product-detail-carousel.component';
import {useState} from "react";

export default function ProductDetailPage() {
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams('/products/:category/:id/:slug');
    const productId = extractProductIdFromSlug(id);
    const { data: product, isLoading, error } = useFetchProductById(productId?.toString() ?? '');

    if (isLoading) return <ProductDetailLayout><Loader className={"content-center"} /></ProductDetailLayout>;
    if (error || !productId) return <div>Error fetching product details</div>;

    // For demonstration, assuming the product has one image, we duplicate it to show how the carousel works
    const productImages = product?.image ? [product.image, product.image, product.image] : [];


    const unitPrice = product?.price || 0;
    const totalPrice = unitPrice * quantity;

    return (
        <ProductDetailLayout>
            <Grid>

                <Grid.Col span={{ base: 12, sm: 6 }} className={"block md:hidden"}>
                    <Card shadow="md" radius="lg" p="lg" withBorder>
                        <Title order={1} size="h2" fw={700}>
                            {product?.title}
                        </Title>
                    </Card>
                    <Divider className={"mt-3"} />
                </Grid.Col>


                <Grid.Col span={{ base: 12, sm: 6 }}>
                    <ProductDetailCarousel images={productImages} />
                </Grid.Col>


                <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Card shadow="md" radius="lg" withBorder style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <div style={{ flexGrow: 1 }}>
                            <div className={"hidden md:block"}>
                                <Title size="h2" fw={700}>
                                    {product?.title}
                                </Title>
                                <Divider className={"my-2"} />
                            </div>
                            <Group p="apart" align="center" mt={"sm"}>
                                <Badge color="pink" size="lg">{product?.category}</Badge>

                                <Rating value={product?.rating.rate} fractions={2} readOnly />
                            </Group>

                            <Text size="lg" fw={500} c="dimmed" className="line-clamp-6" mt={"xs"}>
                                {product?.description}
                            </Text>

                            <Space h="md" />
                        </div>

                        <Group align="center">
                            <NumberInput
                                defaultValue={1}
                                min={1}
                                step={1}
                                size="md"
                                radius="md"
                                label="Qty"
                                value={quantity}
                                onChange={(value) => setQuantity(Number(value))}
                                styles={{
                                    input: { maxWidth: '80px' },
                                    label: { fontWeight: 600 },
                                }}
                                mb="lg"
                            />
                            <Text size="xl" fw={700} c="green" style={{ lineHeight: 1 }}>
                                ${totalPrice.toFixed(2)}
                            </Text>
                        </Group>



                        <Button.Group mt="md" style={{ marginTop: 'auto' }}>
                            <Button
                                leftSection={<IconShoppingCart />}
                                color="green"
                                radius="md"
                                size="md"
                                style={{ flexGrow: 1 }}
                            >
                                Add to Cart
                            </Button>

                            <Button
                                color="blue"
                                radius="md"
                                size="md"
                            >
                                <IconBookmark size={24} />
                            </Button>
                        </Button.Group>
                    </Card>
                </Grid.Col>
            </Grid>

            {/*@ts-ignore*/}
            <ProductDetailRecommended category={product?.category.toString()} currentProductId={product?.id} />
        </ProductDetailLayout>
    );
}
