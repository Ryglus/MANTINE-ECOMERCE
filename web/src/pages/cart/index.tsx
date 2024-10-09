import React from 'react';
import {Button, Card, Container, Divider, Group, Text, Title} from '@mantine/core';
import {Link} from 'react-router-dom'; // For the continue shopping button
import {useCartStore} from "../../store/cart-store";
import MainLayout from "../../layouts/index-layout";

export default function CartPage() {
    const { items, removeItem, clearCart } = useCartStore();
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (items.length === 0) {
        return (
            <MainLayout takeSpace={true}>
                <Container size="xl">
                    <Title>Your Cart is Empty</Title>
                    <Button component={Link} to="/products" mt="lg">
                        Continue Shopping
                    </Button>
                </Container>
            </MainLayout >
        );
    }

    return (
        <MainLayout takeSpace={true}>
            <Container size="xl">
                <Group p="apart">
                    <Title>Shopping Cart</Title>
                    <Group>
                        <Button color="red" onClick={clearCart}>
                            Clear Cart
                        </Button>

                    </Group>
                </Group>
                <Divider my="sm" />

                {items.map((item) => (
                    <Card shadow="sm" p="lg" mb="lg" key={item.id}>
                        <Group p="apart">
                            <div>
                                <Text>{item.title}</Text>
                                <Text size="sm" c="dimmed">
                                    ${item.price} x {item.quantity}
                                </Text>
                            </div>
                            <Button color="red" onClick={() => removeItem(item.id)}>
                                Remove
                            </Button>
                        </Group>
                    </Card>
                ))}

                <Group p="apart" mt="md">
                    <Text>Total Price: ${totalPrice.toFixed(2)}</Text>
                    <Button component={Link} to="/products" color="blue">
                        Continue Shopping
                    </Button>
                    <Button component={Link} to="/checkout" color="blue">
                        Finalize Shopping
                    </Button>
                </Group>
            </Container>
        </MainLayout>
    );
}
