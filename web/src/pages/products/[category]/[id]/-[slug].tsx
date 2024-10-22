import {
    Badge,
    Button,
    Card,
    Container,
    Divider,
    Grid,
    Group,
    Loader,
    Paper,
    Rating,
    Space,
    Stack,
    Text,
    Title
} from '@mantine/core';
import {IconBookmark, IconShoppingCart} from '@tabler/icons-react';
import {Link, useNavigate} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {useParams} from "../../../../router";
import {useFetchProductById} from "../../../../lib/api/product.api";
import {slugify} from "../../../../utils/urlBuilder";
import MainLayout from "../../../../layouts/index-layout";
import ProductDetailCarousel from "./_components/product-detail-carousel.component";
import ProductDetailRecommended from "../../../../components/product-recomended-section.component";
import {useCartStore} from "../../../../store/cart-store";
import SvgPageBg from "../../../../components/common/svg-page-bg.component";
import CartQuantity from "../../../../components/cart-quantity.component";
import QtyInput from "../../../../components/inputs/qty-input.component";
import useDynamicTitle from "../../../../hooks/useDynamicTitle";

export default function ProductDetail() {
    const [quantity, setQuantity] = useState(1);
    const { id, slug, category } = useParams('/products/:category/:id/:slug?');
    const { data: product, isLoading, error } = useFetchProductById(id);
    useDynamicTitle(`${product?.title}`);
    const navigate = useNavigate();
    const addItem = useCartStore((state) => state.addItem);
    const itemQuantity = useCartStore((state) => state.items.find((i) => i.id === product?.id)?.quantity || 0);
    const removeItem = useCartStore((state) => state.removeItem);
    useEffect(() => {
        if (product && slug !== slugify(product?.title)) {
            const correctSlug = slugify(product?.title);
            navigate(`/products/${category}/${id}/${correctSlug}`, { replace: true });
        }
    }, [product, slug, category, id, navigate]);

    if (isLoading) return <MainLayout><Container size={"xl"}><Loader className={"content-center"} /></Container></MainLayout>;
    if (error || !id) return <MainLayout><Container size={"xl"}><div>Error fetching product details</div></Container></MainLayout>;

    const breadcrumbs = [
        { label: product?.category.toUpperCase(), path: `/products/${product?.category}` },
        { label: product?.title.toUpperCase(), path: `/products/${product?.category}/${id}/${slug}` }
    ];

    const productImages = product?.image ? [product.image, product.image, product.image] : [];
    const unitPrice = product?.price || 0;

    const handleAddToCart = () => {
        if (product) {
            addItem(product, quantity);
        }
    };

    return (
        <SvgPageBg>
            <MainLayout>
                <Container size={"xl"}>
                    <Grid>
                        <Grid.Col span={{ base: 12, sm: 6 }} className={"block md:hidden"}>
                            <Card shadow="md" radius="lg" p="lg" withBorder>
                                <Title order={1} size="h1" fw={700}>
                                    {product?.title}
                                </Title>
                            </Card>
                            <Divider className={"mt-2"} />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, sm: 7, md: 6 }}>
                            <ProductDetailCarousel images={productImages} />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, sm: 5, md: 6 }}>
                            <Stack className={"p-4"} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <div style={{ flexGrow: 1 }}>
                                    <Text fw={600} size="xs" c="dimmed">
                                        {breadcrumbs.map((breadcrumb, index) => (
                                            <span key={breadcrumb.label}>
                                                <Link to={breadcrumb.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                    {breadcrumb.label}
                                                </Link>
                                                {index < breadcrumbs.length - 1 && ' | '}
                                            </span>
                                        ))}
                                    </Text>

                                    <Title size="h1" fw={700} className={"hidden md:block"}>
                                        {product?.title}
                                    </Title>
                                    <Divider className={"my-2"} />

                                    <Group p="apart" align="center" mt={"sm"}>
                                        <Badge color="pink" size="lg">{product?.category}</Badge>
                                        <Rating value={product?.rating.rate} fractions={2} readOnly />
                                    </Group>

                                    <Text size="lg" fw={500} c="dimmed" className="line-clamp-6" mt={"xs"}>
                                        {product?.description}
                                    </Text>

                                    <Space h="md" />
                                </div>

                                <Group>
                                    {product && (
                                        <Paper
                                            radius="xl"
                                            shadow="md"
                                            bg={"bg.8"}
                                            py={5}
                                            px={itemQuantity ? 5 : 0}
                                            className={`relative transition-all duration-500 ease-out select-none`}
                                            style={{
                                                width: itemQuantity ? '250px' : '0',
                                                overflow: 'hidden',
                                                opacity: itemQuantity ? 1 : 0,
                                            }}
                                        >
                                            <Group style={{ flexWrap: 'nowrap', width: '100%', position: 'relative' }}>
                                                <div className={"z-20"}>
                                                    <CartQuantity
                                                        size={"md"}
                                                        quantity={itemQuantity}
                                                        onRemove={() => { removeItem(product.id); }}
                                                    />
                                                </div>

                                                <Text
                                                    size={"27"}
                                                    fw={700}
                                                    style={{
                                                        lineHeight: 1,
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        marginLeft: '8px',
                                                    }}
                                                >
                                                    To cart
                                                </Text>
                                            </Group>
                                            <Link to={"/cart"} className="absolute inset-0 z-10" />
                                        </Paper>
                                    )}

                                    <Text size={"30"} fw={700} style={{ lineHeight: 1 }}>
                                        ${unitPrice.toFixed(2)}
                                    </Text>
                                </Group>
                                <Stack>
                                    <QtyInput
                                        min={1}
                                        value={quantity}
                                        onChange={(value) => setQuantity(Number(value))}
                                        size="md"
                                    />
                                    <Button.Group>
                                        <Button
                                            leftSection={<IconShoppingCart />}
                                            radius="sm"
                                            size="md"
                                            style={{ flexGrow: 1 }}
                                            onClick={handleAddToCart}
                                        >
                                            Add to Cart
                                        </Button>
                                        <Button
                                            variant={"default"}
                                            radius="sm"
                                            size="md"
                                        >
                                            <IconBookmark size={24} />
                                        </Button>
                                    </Button.Group>
                                </Stack>
                            </Stack>

                        </Grid.Col>
                    </Grid>

                    {product?.category && (
                        <ProductDetailRecommended category={product?.category.toString()} currentProductId={product?.id} />
                    )}
                </Container>
            </MainLayout>
        </SvgPageBg>
    );
}
