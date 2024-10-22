import {useCartStore} from '../../store/cart-store';
import MainLayout from '../../layouts/index-layout';
import {Box, Button, Container, Divider, Flex, Grid, Group, Paper, Stack, Text, TextInput, Title} from '@mantine/core';
import {Link} from 'react-router-dom';
import ProductIncartCard from '../../components/cards/product-incart.card';
import SvgPageBg from '../../components/common/svg-page-bg.component';
import {IconDiscount2} from '@tabler/icons-react';
import {useState} from 'react';
import PayPalButton from './_components/paypal-button.component';
import ApplePayButton from './_components/applepay-button.component';
import useDynamicTitle from '../../hooks/useDynamicTitle';
import ProductRecommendedSection from "../../components/product-recomended-section.component";

export default function CartPage() {
    const { items, clearCart } = useCartStore();
    useDynamicTitle('Cart');
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const [promoCode, setPromoCode] = useState<string>('');

    const handleApplyPromo = () => {
        console.log('Promo Code Applied:', promoCode);
    };

    if (items.length === 0) {
        return (
            <SvgPageBg>
                <MainLayout>
                    <Container size="lg" py="xl">
                        <Flex direction="column" align="center" justify="center" py="xl" className="text-center">
                            <Title order={1} mt="lg">
                                Your Cart is Empty
                            </Title>
                            <Text size="lg" c="dimmed" mt="sm">
                                It looks like you haven't added anything to your cart yet. Start shopping and find something you love.
                            </Text>
                            <Button component={Link} to="/products" mt="xl" size="lg" radius="md" variant="gradient" gradient={{ from: 'bg.6', to: 'bg.7' }}>
                                Continue Shopping
                            </Button>
                        </Flex>
                        <Box mt="xl">
                            <ProductRecommendedSection title="Recommended for you" category="jewelery" />
                        </Box>
                    </Container>
                </MainLayout>
            </SvgPageBg>
        );
    }

    return (
        <SvgPageBg>
            <MainLayout>
                <Container size="xl">
                    <Grid gutter="md">
                        <Grid.Col span={12} order={{ base: 2, md: 1 }}>
                            <Flex justify="space-between" align="center">
                                <Title>Shopping Cart</Title>
                                <Button color="red" onClick={clearCart}>
                                    Clear Cart
                                </Button>
                            </Flex>
                            <Divider my="sm" />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 8 }} order={{ base: 3, md: 2 }} mb="lg">
                            {items.map((item) => (
                                <div key={item.id}>
                                    <ProductIncartCard product={item} quantity={item.quantity} />
                                    <Divider my="sm" />
                                </div>
                            ))}
                            <Button component={Link} to="/products" fullWidth>
                                Back to shopping
                            </Button>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 4 }} order={{ base: 1, md: 3 }} mb="lg">
                            <div className="sticky top-0">
                                <Title order={3} size={30} mb="sm">Order Summary</Title>
                                <Divider my="sm" />
                                <Stack gap="xs" px="md">
                                    <Text size="lg">Qty: {items.length}</Text>
                                    <Text size="lg">Shipping: TBD</Text>
                                    <Divider />
                                    <Text size="lg" fw={600}>Total: ${totalPrice.toFixed(2)}</Text>
                                </Stack>
                                <Divider my="md" />
                                <Paper py="sm" px="xs" radius="md">
                                    <Text fw={500} size="lg">Have a promo code?</Text>
                                    <Group align="center">
                                        <TextInput
                                            leftSection={<IconDiscount2 size={25} />}
                                            placeholder="Enter promo code"
                                            value={promoCode}
                                            onChange={(event) => setPromoCode(event.currentTarget.value)}
                                            style={{ flexGrow: 1 }}
                                        />
                                        <Button variant="outline" onClick={handleApplyPromo}>
                                            Apply
                                        </Button>
                                    </Group>
                                </Paper>

                                <Divider my="sm" />
                                <Button component={Link} bg="bg.4" to="/checkout" fullWidth>
                                    Checkout
                                </Button>
                                <Text size="sm" c="dimmed" mt="sm">
                                    By continuing, you agree to our{' '}
                                    <Link to="/terms" className="underline text-primary">Terms of Service</Link> and{' '}
                                    <Link to="/privacy-policy" className="underline text-primary">Privacy Policy</Link>.
                                </Text>
                                <Divider my="lg" />
                                <Text size="md">or use other checkout methods</Text>
                                <Container>
                                    <PayPalButton />
                                    <Divider label="or" my={10} />
                                    <ApplePayButton theme="light" />
                                </Container>
                            </div>
                        </Grid.Col>
                    </Grid>
                </Container>
            </MainLayout>
        </SvgPageBg>
    );
}
