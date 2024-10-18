import React from 'react';
import {Card, Divider, Group, Stack, Text, Title} from '@mantine/core';
import {Product} from "../../../../lib/api/dto/product.dto";

interface TopProductsProps {
    products: Product[];
}

export const TopProducts: React.FC<TopProductsProps> = ({ products }) => {
    return (
        <Card shadow="md" p="lg">
            <Title order={4}>Top Products</Title>
            <Divider my="sm" />
            <Stack gap="sm">
                {products.map((product, index) => (
                    <Group key={index} gap="apart">
                        <Text>{product.title}</Text>
                    </Group>
                ))}
            </Stack>
        </Card>
    );
};
