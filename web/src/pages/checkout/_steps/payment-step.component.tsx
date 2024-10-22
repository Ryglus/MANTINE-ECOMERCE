import {useEffect} from 'react';
import {Stack} from '@mantine/core';
import {StepComponentProps} from '../../../lib/api/dto/checkout.dto';
import {useForm} from '@mantine/form';
import {PaymentOptionsForm} from "../_forms";


export default function PaymentStep(
    {
        onValidChange,
        data
    }: StepComponentProps) {

    const paymentData = data?.payment || null;

    const form = useForm({
        initialValues: {
            cardNumber: paymentData?.cardNumber || '',
            cardholderName: paymentData?.cardholderName || '',
            expiryDate: paymentData?.expiryDate || '',
            cvv: paymentData?.cvv || '',
            selectedPaymentMethod: 'credit-card',
        },
        validate: {
            cardNumber: (value, values) =>
                values.selectedPaymentMethod === 'credit-card' && value.trim().length !== 19
                    ? 'Card number must be 16 digits'
                    : null,
            cardholderName: (value, values) =>
                values.selectedPaymentMethod === 'credit-card' && !value
                    ? 'Cardholder name is required'
                    : null,
            expiryDate: (value, values) =>
                values.selectedPaymentMethod === 'credit-card' && value.length !== 5
                    ? 'Invalid expiry date format (MM/YY)'
                    : null,
            cvv: (value, values) =>
                values.selectedPaymentMethod === 'credit-card' && value.length !== 3
                    ? 'CVV must be 3 digits'
                    : null,
        },
    });

    useEffect(() => {
        const isValid = form.isValid();
        onValidChange?.(isValid, {
            ...form.values,
        });
    }, [form.values]);

    return (
        <Stack>
            <PaymentOptionsForm form={form} />
        </Stack>
    );
}
