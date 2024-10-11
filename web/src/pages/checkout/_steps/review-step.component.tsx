import {useCartStore} from '../../../store/cart-store';
import ProductIncartCard from "../../../components/_cards/product-incart.card";
import {Card, Stack, Text} from '@mantine/core';
import {DeliveryData, PaymentData, StepComponentProps} from '../../../lib/api/dto/checkout.dto';

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
                    <Stack>
                        <Text>{deliveryData.firstname} {deliveryData.lastname}</Text>
                        <Text>{deliveryData.street} {deliveryData.number}</Text>
                        <Text>{deliveryData.city}, {deliveryData.zipcode}</Text>
                        <Text>{deliveryData.phone}</Text>
                    </Stack>
                </Card>
            ) : (
                <Text c="red">No delivery address found. Please provide a valid address.</Text>
            )}

            {paymentData ? (
                <Card shadow="sm" p="lg" withBorder mb="md">
                    <Stack>
                        <Text>Cardholder: {paymentData.cardholderName}</Text>
                        <Text>Card Number: **** **** **** {paymentData.cardNumber.slice(-4)}</Text>
                        <Text>Billing Address: {paymentData.billingAddress}</Text>
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
            <Card shadow="sm" p="lg" withBorder mb="md">
                <Stack>
                    <Text>Total: {totalPrice}</Text>

                </Stack>
            </Card>
        </div>
    );
}
