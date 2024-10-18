import React, {useState} from 'react';
import {Button, Flex, SimpleGrid, Stack, Text, TextInput} from '@mantine/core';
import {UseFormReturnType} from '@mantine/form';
import {IconBrandPaypal, IconBuildingBank, IconCreditCard} from '@tabler/icons-react';

interface PaymentOptionsFormProps {
    form: UseFormReturnType<{
        cardNumber: string;
        cardholderName: string;
        expiryDate: string;
        cvv: string;
        selectedPaymentMethod: string;
    }>;
}

const paymentMethods = [
    { label: 'Credit Card', value: 'credit-card', icon: IconCreditCard },
    { label: 'PayPal', value: 'paypal', icon: IconBrandPaypal },
    { label: 'Bank Transfer', value: 'bank-transfer', icon: IconBuildingBank },
];

const formatCardNumber = (value: string) => {
    return value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
};

const formatExpiryDate = (value: string) => {
    const cleanValue = value.replace(/\D/g, '');
    if (cleanValue.length <= 2) return cleanValue;
    return `${cleanValue.slice(0, 2)}/${cleanValue.slice(2, 4)}`;
};

export default function PaymentOptionsForm({ form }: PaymentOptionsFormProps) {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
        form.values.selectedPaymentMethod || 'credit-card'
    );

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedCardNumber = formatCardNumber(e.target.value);
        form.setFieldValue('cardNumber', formattedCardNumber);
    };

    const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedExpiryDate = formatExpiryDate(e.target.value);
        form.setFieldValue('expiryDate', formattedExpiryDate);
    };

    const renderCreditCardFields = () => (
        <>
            <TextInput
                label="Cardholder Name"
                placeholder="Enter the name as on your card"
                {...form.getInputProps('cardholderName')}
                error={form.errors.cardholderName}
                required
            />
            <TextInput
                label="Credit Card Number"
                placeholder="1234 5678 9012 3456"
                value={form.values.cardNumber}
                onChange={handleCardNumberChange}
                error={form.errors.cardNumber}
                description="Enter 16-digit credit card number"
                maxLength={19}
                required
            />
            <SimpleGrid cols={2}>
                <TextInput
                    label="Expiry Date"
                    placeholder="MM/YY"
                    value={form.values.expiryDate}
                    onChange={handleExpiryDateChange}
                    error={form.errors.expiryDate}
                    description="MM/YY"
                    maxLength={5}
                    required
                />
                <TextInput
                    label="CVV"
                    placeholder="***"
                    {...form.getInputProps('cvv')}
                    error={form.errors.cvv}
                    description="3 digits at the back of your card"
                    maxLength={3}
                    required
                />
            </SimpleGrid>
        </>
    );

    const renderPayPalFields = () => <Text>Redirecting to PayPal for payment...</Text>;

    const renderBankTransferFields = () => (
        <Text>Instructions for bank transfer will be sent after submission.</Text>
    );

    const renderPaymentForm = () => {
        switch (selectedPaymentMethod) {
            case 'credit-card':
                return renderCreditCardFields();
            case 'paypal':
                return renderPayPalFields();
            case 'bank-transfer':
                return renderBankTransferFields();
            default:
                return null;
        }
    };

    const handlePaymentMethodChange = (value: string) => {
        setSelectedPaymentMethod(value);
        form.setFieldValue('selectedPaymentMethod', value);
    };

    return (
        <Stack>
            <Flex justify={"center"} gap={"lg"} mb="md">
                {paymentMethods.map((method) => (
                    <Button
                        key={method.value}
                        variant={selectedPaymentMethod === method.value ? 'filled' : 'outline'}
                        leftSection={<method.icon size={20} />}
                        onClick={() => handlePaymentMethodChange(method.value)}
                    >
                        {method.label}
                    </Button>
                ))}
            </Flex>

            <form onSubmit={form.onSubmit(() => {})}>{renderPaymentForm()}</form>
        </Stack>
    );
}
