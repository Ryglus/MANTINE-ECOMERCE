import {
    Badge,
    Button,
    Card,
    Container,
    Divider,
    Grid,
    Group,
    Loader,
    NumberInput,
    Rating,
    Space,
    Stack,
    Text,
    Title
} from '@mantine/core';
import {IconBookmark, IconShoppingCart} from '@tabler/icons-react';
import {Link, useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";
import {useParams} from "../../../../router";
import {useFetchProductById} from "../../../../lib/api/product.api";
import {slugify} from "../../../../utils/urlBuilder";
import MainLayout from "../../../../layouts/index-layout";
import SvgTopPageBg from "../../../../components/svg-top-page-bg.component";
import ProductDetailCarousel from "./_components/product-detail-carousel.component";
import ProductDetailRecommended from "./_components/product-detail-recomended.component";
import {useCartStore} from "../../../../store/cart-store";

export default function ProductDetail() {
    const [quantity, setQuantity] = useState(1);
    const { id, slug, category } = useParams('/products/:category/:id/:slug?');
    const { data: product, isLoading, error } = useFetchProductById(id);
    const navigate = useNavigate();
    const addItem = useCartStore((state) => state.addItem);

    useEffect(() => {
        if (product && slug !== slugify(product?.title)) {
            const correctSlug = slugify(product?.title);
            navigate(`/products/${category}/${id}/${correctSlug}`, { replace: true });
        }
    }, [product, slug, category, id, navigate]);

    if (isLoading) return <MainLayout><Container size={"xl"}><Loader className={"content-center"} /></Container></MainLayout>;
    if (error || !id) return <MainLayout><Container size={"xl"}><div>Error fetching product details</div></Container></MainLayout>;

    const breadcrumbs = [
        { label: 'Home'.toUpperCase(), path: '/' },
        { label: 'Shop'.toUpperCase(), path: '/products' },
        { label: product?.category.toUpperCase(), path: `/products/${category}` },
        { label: product?.title.toUpperCase(), path: `/products/${category}/${id}/${slug}` }
    ];

    const productImages = product?.image ? [product.image, product.image, product.image] : [];
    const unitPrice = product?.price || 0;
    const totalPrice = unitPrice * quantity;

    const handleAddToCart = () => {
        if (product) {
            addItem(product, quantity);
        }
    };

    return (
        <MainLayout>
            <SvgTopPageBg color1={"red"} color2={"blue"} />
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
                        <Stack className={"p-4"}>
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
                                    onClick={handleAddToCart}
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
                        </Stack>
                    </Grid.Col>
                </Grid>

                {product?.category && (
                    <ProductDetailRecommended category={product?.category.toString()} currentProductId={product?.id} />
                )}
            </Container>
        </MainLayout>
    );
}
