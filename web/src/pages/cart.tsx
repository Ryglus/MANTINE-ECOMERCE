import {useCartStore} from "../store/cart-store";
import MainLayout from "../layouts/index-layout";
import {Button, Container, Divider, Group, Text, Title} from "@mantine/core";
import {Link} from "react-router-dom";
import ProductIncartCard from "../components/_cards/product-incart.card";


export default function CartPage() {
    const { items, clearCart } = useCartStore();
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (items.length === 0) {
        return (
            <MainLayout>
                <Container size="xl">
                    <Title>Your Cart is Empty</Title>
                    <Button component={Link} to="/products" mt="lg">
                        Continue Shopping
                    </Button>
                </Container>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
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
                    <ProductIncartCard
                        key={item.id}
                        product={item}
                        quantity={item.quantity}
                    />
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
