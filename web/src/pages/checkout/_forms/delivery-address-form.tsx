import {Grid, TextInput} from '@mantine/core';
import {UseFormReturnType} from '@mantine/form';


interface DeliveryAddressFormProps {
    form: UseFormReturnType<any>;
}

export default function DeliveryAddressForm({ form }: DeliveryAddressFormProps) {
    const formatZipCode = (value: string) => value.replace(/\D/g, '').replace(/(\d{3})(\d{2})/, '$1 $2').trim();

    return (
        <Grid gutter="md">
            <Grid.Col span={{ xs: 6 }}>
                <TextInput
                    label="City"
                    placeholder="Prague"
                    {...form.getInputProps('city')}
                    error={form.errors.city}
                    required
                />
            </Grid.Col>
            <Grid.Col span={{ xs: 6 }}>
                <TextInput
                    label="Street"
                    placeholder="Main St"
                    {...form.getInputProps('street')}
                    error={form.errors.street}
                    required
                />
            </Grid.Col>
            <Grid.Col span={{ xs: 6 }}>
                <TextInput
                    label="Street Number"
                    placeholder="123"
                    {...form.getInputProps('number')}
                    error={form.errors.number}
                    required
                />
            </Grid.Col>
            <Grid.Col span={{ xs: 6 }}>
                <TextInput
                    label="ZIP Code"
                    maxLength={5}
                    placeholder="123 45"
                    {...form.getInputProps('zipcode')}
                    value={formatZipCode(form.values.zipcode)}
                    onChange={(e) => form.setFieldValue('zipcode', formatZipCode(e.currentTarget.value))}
                    error={form.errors.zipcode}
                    required
                />
            </Grid.Col>
        </Grid>
    );
}
