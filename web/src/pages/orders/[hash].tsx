import {Card, Container, Divider, Grid, Group, Stack, Text, Timeline, Title} from '@mantine/core';
import {useEffect, useState} from 'react';
import {MinifiedOrderData} from '../../lib/api/dto/order.dto';
import {decodeOrderHash} from '../../utils/otherHasher';
import ProductIncartCard from '../../components/_cards/product-incart.card';
import {useParams} from '../../router';
import {fetchProductById} from '../../lib/api/product.api';
import {Product} from '../../lib/api/dto/product.dto';
import MainLayout from '../../layouts/index-layout';
import SvgPageBg from '../../components/ui/svg-page-bg.component';
import {IconCreditCard, IconHome, IconPackage, IconTruckDelivery, IconUser} from '@tabler/icons-react';

export default function OrderPage() {
    const { hash } = useParams('/orders/:hash');
    const [orderData, setOrderData] = useState<MinifiedOrderData | null>(null);
    const [products, setProducts] = useState<{ id: number; data: Product }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (hash) {
            try {
                const decodedData = decodeOrderHash(hash);
                setOrderData(decodedData);

                const fetchProducts = async () => {
                    const productPromises = decodedData.items.map((item) =>
                        fetchProductById(String(item.id)).then((product) => ({
                            id: item.id,
                            data: product,
                        }))
                    );

                    const fetchedProducts = await Promise.all(productPromises);
                    setProducts(fetchedProducts);
                    setLoading(false);
                };

                fetchProducts();
            } catch (error) {
                console.error('Invalid or corrupted order hash:', error);
                setOrderData(null);
            }
        }
    }, [hash]);

    if (!orderData) {
        return (
            <MainLayout>
                <Container size="md" pt="xl">
                    <Text c="red" size="lg">
                        Invalid order information or corrupted URL.
                    </Text>
                </Container>
            </MainLayout>
        );
    }

    if (loading) {
        return (
            <MainLayout>
                <Container size="md" pt="xl">
                    <Text size="lg">
                        Loading products...
                    </Text>
                </Container>
            </MainLayout>
        );
    }

    return (
        <SvgPageBg>
            <MainLayout>
                <Container size="xl" py="xl">
                    <Title className={"text-center"} size={40} mb="xl">
                        Order Summary
                    </Title>

                    <Grid gutter="xl">
                        <Grid.Col span={{md:6}}>
                            <Card shadow="sm" p="lg" radius="md">
                                <Group mb="md">
                                    <IconUser size={24} />
                                    <Title order={4}>Delivery Details</Title>
                                </Group>
                                <Divider mb="md" />
                                <Stack gap="xs">
                                    <Text>
                                        <strong>Name:</strong> {orderData.delivery.firstname}{' '}
                                        {orderData.delivery.lastname}
                                    </Text>
                                    <Text>
                                        <strong>Address:</strong> {orderData.delivery.street}{' '}
                                        {orderData.delivery.number}
                                    </Text>
                                    <Text>
                                        <strong>City:</strong> {orderData.delivery.city}, {orderData.delivery.zipcode}
                                    </Text>
                                    <Text>
                                        <strong>Phone:</strong> {orderData.delivery.phone}
                                    </Text>
                                </Stack>
                            </Card>
                        </Grid.Col>
                        <Grid.Col span={{md:6}}>
                            <Card shadow="sm" p="lg" radius="md">
                                <Group mb="md">
                                    <IconCreditCard size={24} />
                                    <Title order={4}>Payment Details</Title>
                                </Group>
                                <Divider mb="md" />
                                <Stack gap="xs">
                                    {Object.entries(orderData.payment).map(([key, value]) => (
                                        value && (
                                            <Text key={key}>
                                                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {String(value)}
                                            </Text>
                                        )
                                    ))}
                                </Stack>
                            </Card>
                        </Grid.Col>
                    </Grid>

                    <Card shadow="sm" p="lg" radius="md" mt="xl">
                        <Group mb="md">
                            <IconPackage size={24} />
                            <Title order={4}>Shipping Status</Title>
                        </Group>
                        <Divider mb="md" />
                        <ShippingStatus status='order_placed' />
                    </Card>

                    <Title order={4} mt="xl" mb="md">
                        Products
                    </Title>
                    {products.length > 0 ? (
                        <Stack gap="md">
                            {products.map((product) => (
                                <ProductIncartCard
                                    key={product.id}
                                    product={product.data}
                                    quantity={orderData.items.find((item) => item.id === product.id)?.quantity || 1}
                                    isEditable={false}
                                />
                            ))}
                        </Stack>
                    ) : (
                        <Text>No products found in this order.</Text>
                    )}
                </Container>
            </MainLayout>
        </SvgPageBg>
    );
}

function ShippingStatus({ status }: { status: string }) {
    const getStatusTimeline = () => {
        const steps = [
            {
                status: 'order_placed',
                label: 'Order Placed',
                icon: <IconPackage size={20} />,
            },
            {
                status: 'in_transit',
                label: 'In Transit',
                icon: <IconTruckDelivery size={20} />,
            },
            {
                status: 'delivered',
                label: 'Delivered',
                icon: <IconHome size={20} />,
            },
        ];

        return steps.map((step, index) => (
            <Timeline.Item
                key={step.status}
                bullet={step.icon}
                color={getTimelineColor(status, step.status)}
            >
                <Stack gap={0} className={"h-full"} justify="center">
                    <Title size={"md"} mt={index >= 1 ? 4 : 0}>{step.label}</Title>
                        {step.status === 'order_placed' && <Text>{new Date().toLocaleDateString()}</Text>}
                </Stack>

            </Timeline.Item>
        ));
    };

    const getTimelineColor = (currentStatus: string, stepStatus: string) => {
        const statusOrder = ['order_placed', 'in_transit', 'delivered'];
        if (statusOrder.indexOf(currentStatus) >= statusOrder.indexOf(stepStatus)) {
            return 'bg';
        }
        return 'gray';
    };

    return (
        <Timeline active={1} bulletSize={30} lineWidth={3}>
            {getStatusTimeline()}
        </Timeline>
    );
}
