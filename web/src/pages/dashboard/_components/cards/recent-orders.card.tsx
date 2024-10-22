import React from 'react';
import {Card, Divider, Group, Stack, Text, Title} from '@mantine/core';

interface RecentOrdersProps {
    orders: { id: string, amount: number }[];
}

export const RecentOrders: React.FC<RecentOrdersProps> = ({ orders }) => {
    return (
        <Card shadow="md" p="lg">
            <Title order={4}>Recent Orders</Title>
            <Divider my="sm" />
            <Stack gap="sm">
                {orders.map((order, index) => (
                    <Group key={index} gap="apart">
                        <Text>Order #{order.id}</Text>
                        <Text fw={700}>${order.amount}</Text>
                    </Group>
                ))}
            </Stack>
        </Card>
    );
};
