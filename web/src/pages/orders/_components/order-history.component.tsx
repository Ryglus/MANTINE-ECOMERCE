import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Card, Container, Divider, Flex, Stack, Text, Title} from '@mantine/core';
import {useOrderStore} from "../../../store/order-store";

export default function OrderHistory() {
    const orders = useOrderStore((state) => state.getAllOrders());

    if (orders.length === 0) {
        return (
            <Container size="md" py="xl">
                <Stack align="center" justify="center" py="xl">
                    <Title order={3} mt="lg">
                        Your Order History is Empty
                    </Title>
                    <Text size="lg" c="dimmed" mt="sm">
                        You haven’t placed any orders yet. Start shopping and place your first order.
                    </Text>
                    <Button component={Link} to="/products" mt="xl" size="lg" radius="md" variant="gradient" gradient={{ from: 'bg.6', to: 'bg.7' }}>
                        Start Shopping
                    </Button>
                </Stack>
            </Container>
        );
    }

    return (
        <Container size="md" py="xl">
            <Title className="text-center" mb="xl">Order History</Title>
            <Stack gap="xl">
                {orders.map((order) => (
                    <Card key={order.id} shadow="sm" radius="md" p="lg" withBorder>
                        <Flex justify="space-between">
                            <div>
                                <Text size="md" fw={500}>ID: {order.id}</Text>
                                <Text size="sm" c="dimmed">
                                    Date: {new Date(order.date).toLocaleDateString()}
                                </Text>
                            </div>
                            <Button component={Link} to={`/orders/${order.id}`} variant="light" radius="md">
                                View Order
                            </Button>
                        </Flex>
                        <Divider my="sm" />
                        <Text size="sm" c="dimmed">
                            {order.products.length} products in this order
                        </Text>
                    </Card>
                ))}
            </Stack>
        </Container>
    );
}
