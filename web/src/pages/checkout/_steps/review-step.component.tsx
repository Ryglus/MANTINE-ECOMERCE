import {useCartStore} from '../../../store/cart-store';
import ProductIncartCard from "../../../components/_cards/product-incart.card";
import {Card, Divider, Flex, Group, Stack, Text, Title} from '@mantine/core';
import {DeliveryData, PaymentData, StepComponentProps} from '../../../lib/api/dto/checkout.dto';
import {IconCreditCard, IconUser} from "@tabler/icons-react";

export default function ReviewStep({ data }: StepComponentProps) {
    const { items } = useCartStore();
    const deliveryData = data?.delivery as DeliveryData | null;
    const paymentData = data?.payment as PaymentData | null;
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return (
        <div>
            <h2>Review Order</h2>
            {deliveryData ? (
                <Card shadow="sm" p="lg" withBorder mb="md">
                    <Group mb="md">
                        <IconUser size={24} />
                        <Title order={4}>Delivery Details</Title>
                    </Group>
                    <Divider mb="md" />
                    <Stack gap="xs">
                        <Text>
                            <strong>Name:</strong> {deliveryData.firstname}{' '}
                            {deliveryData.lastname}
                        </Text>
                        <Text>
                            <strong>Address:</strong> {deliveryData.street}{' '}
                            {deliveryData.number}
                        </Text>
                        <Text>
                            <strong>City:</strong> {deliveryData.city}, {deliveryData.zipcode}
                        </Text>
                        <Text>
                            <strong>Phone:</strong> {deliveryData.phone}
                        </Text>
                    </Stack>
                </Card>
            ) : (
                <Text c="red">No delivery address found. Please provide a valid address.</Text>
            )}

            {paymentData ? (
                <Card shadow="sm" p="lg" withBorder mb="md">
                    <Group mb="md">
                        <IconCreditCard size={24} />
                        <Title order={4}>Payment Details</Title>
                    </Group>
                    <Divider mb="md" />
                    <Stack>
                        {Object.entries(paymentData).map(([key, value]) => (
                            value && (
                                <Text key={key}>
                                    <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {String(value)}
                                </Text>
                            )
                        ))}
                    </Stack>
                </Card>
            ) : (
                <Text c="red">No payment information provided. Please complete the payment details.</Text>
            )}

            {items.map((item) => (
                <ProductIncartCard
                    key={item.id}
                    product={item}
                    quantity={item.quantity}
                    isEditable={false}
                />
            ))}
            <Flex justify={"space-between"}>
                <Title order={2}>Total</Title>
                <Title order={2}>${totalPrice}</Title>
            </Flex>
            <Divider mt={"sm"}/>
        </div>
    );
}
