import {Button, Card, Group, Text} from "@mantine/core";
import React from "react";
import {Product} from "../../lib/api/dto/product.dto";
import {useCartStore} from "../../store/cart-store";

interface ProductIncartCardProps {
    product: Product;
    quantity: number;
}

export default function ProductIncartCard({ product, quantity }: ProductIncartCardProps) {
    const removeItem = useCartStore((state) => state.removeItem);

    return (
        <Card shadow="sm" p="lg" mb="lg" key={product.id}>
            <Group p="apart">
                <div>
                    <Text>{product.title}</Text>
                    <Text size="sm" c="dimmed">
                        ${product.price} x {quantity}
                    </Text>
                </div>
                <Button color="red" onClick={() => removeItem(product.id)}>
                    Remove
                </Button>
            </Group>
        </Card>
    );
}
