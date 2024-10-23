import React from 'react';
import {useParams} from '../../router';
import {useOrderStore} from '../../store/order-store';
import {Card, Container, Divider, Grid, Group, Stack, Text, Timeline, Title} from '@mantine/core';
import MainLayout from "../../layouts/index-layout";
import SvgPageBg from "../../components/common/svg-page-bg.component";
import {IconCreditCard, IconHome, IconPackage, IconTruckDelivery, IconUser} from "@tabler/icons-react";
import ProductIncartCard from "../../components/cards/product-incart.card";

export default function OrderPage() {
    const { id } = useParams('/orders/:id');
    const order = useOrderStore((state) => state.getOrderById(id));

    if (!order) {
        return (
            <MainLayout>
                <Container size="md" pt="xl">
                    <Text c="red" size="lg">
                        Order Not Found
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
                                        <strong>Name:</strong> {order.delivery.firstname}{' '}
                                        {order.delivery.lastname}
                                    </Text>
                                    <Text>
                                        <strong>Address:</strong> {order.delivery.street}{' '}
                                        {order.delivery.number}
                                    </Text>
                                    <Text>
                                        <strong>City:</strong> {order.delivery.city}, {order.delivery.zipcode}
                                    </Text>
                                    <Text>
                                        <strong>Phone:</strong> {order.delivery.phone}
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
                                    {Object.entries(order.payment).map(([key, value]: [string, any]) => (
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

                    {order.products.length > 0 ? (
                        <Stack gap="md">
                            {order.products.map((product) => (
                                <ProductIncartCard
                                    key={product.product.id}
                                    product={product.product}
                                    quantity={product.quantity}
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