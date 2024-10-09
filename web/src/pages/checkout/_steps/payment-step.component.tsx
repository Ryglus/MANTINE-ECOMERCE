import {TextInput} from '@mantine/core';

export default function PaymentStep() {
    return (
        <div>
            <TextInput label="Credit Card Number" required />
            <TextInput label="Expiry Date" required />
            <TextInput label="CVV" required />
        </div>
    );
}
