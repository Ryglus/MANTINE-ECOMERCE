import {useEffect, useState} from 'react';
import {Card, Group, Stack, TextInput} from '@mantine/core';
import {StepComponentProps} from "../../../lib/api/dto/checkout.dto";

export default function PaymentStep({ onValidChange, data }: StepComponentProps) {
    const paymentData = data?.payment || null;

    const [cardNumber, setCardNumber] = useState(paymentData?.cardNumber || '1111111111111111');
    const [cardholderName, setCardholderName] = useState(paymentData?.cardholderName || 'a');
    const [expiryDate, setExpiryDate] = useState(paymentData?.expiryDate || '11/11');
    const [cvv, setCvv] = useState(paymentData?.cvv || '123');
    const [billingAddress, setBillingAddress] = useState(paymentData?.billingAddress || 'a');

    useEffect(() => {
        const isValid = cardNumber.length === 16 && cardholderName && expiryDate && cvv.length === 3 && billingAddress;
        onValidChange?.(!!isValid, { cardNumber, cardholderName, expiryDate, cvv, billingAddress });
    }, [cardNumber, cardholderName, expiryDate, cvv, billingAddress, onValidChange]);

    return (
        <Stack>
            <Card shadow="sm" p="lg" withBorder>
                <Group dir="column" grow>
                    <TextInput
                        label="Cardholder Name"
                        placeholder="Enter the name as on your card"
                        value={cardholderName}
                        onChange={(e) => setCardholderName(e.currentTarget.value)}
                        required
                    />
                    <TextInput
                        label="Credit Card Number"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.currentTarget.value.replace(/\D/g, '').slice(0, 16))}
                        description="Enter 16-digit credit card number"
                        maxLength={16}
                        required
                    />
                    <Group>
                        <TextInput
                            label="Expiry Date"
                            placeholder="MM/YY"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.currentTarget.value.replace(/[^0-9/]/g, '').slice(0, 5))}
                            description="MM/YY"
                            maxLength={5}
                            required
                        />
                        <TextInput
                            label="CVV"
                            placeholder="***"
                            value={cvv}
                            onChange={(e) => setCvv(e.currentTarget.value.replace(/\D/g, '').slice(0, 3))}
                            description="3 digits at the back of your card"
                            maxLength={3}
                            required
                        />
                    </Group>
                    <TextInput
                        label="Billing Address"
                        placeholder="Enter your billing address"
                        value={billingAddress}
                        onChange={(e) => setBillingAddress(e.currentTarget.value)}
                        required
                    />
                </Group>
            </Card>
        </Stack>
    );
}
