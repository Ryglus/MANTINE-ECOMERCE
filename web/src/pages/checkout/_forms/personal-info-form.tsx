import {Grid, Select, TextInput} from '@mantine/core';
import {UseFormReturnType} from '@mantine/form';
import countryCodesList from "country-codes-list";
import {useState} from "react";

enum CountryProperty {
    countryCode = 'countryCode',
}

interface PersonalInfoFormProps {
    form: UseFormReturnType<any>;
}

export default function PersonalInfoForm(
    {
        form
    }: PersonalInfoFormProps) {

    const formatPhoneNumber = (value: string) =>
        value.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3').trim();
    const countryCodes = countryCodesList.customList(CountryProperty.countryCode, '[+{countryCallingCode}] {countryNameEn}');
    const countryCodeOptions = countryCodes
        ? Object.entries(countryCodes).map(([code, label]) => ({
            value: code,
            label: label ?? 'Unknown Country',
        }))
        : [];
    const [phonePrefix, setPhonePrefix] = useState("CZ");
    const handlePhonePrefixChange = (prefix?: string | null) => setPhonePrefix(prefix || '');

    return (
        <Grid gutter="md">
            <Grid.Col span={{ xs: 6 }}>
                <TextInput
                    label="First Name"
                    placeholder="John"
                    {...form.getInputProps('firstname')}
                    error={form.errors.firstname}
                    required
                />
            </Grid.Col>
            <Grid.Col span={{ xs: 6 }}>
                <TextInput
                    label="Last Name"
                    placeholder="Doe"
                    {...form.getInputProps('lastname')}
                    error={form.errors.lastname}
                    required
                />
            </Grid.Col>
            <Grid.Col span={{ xs: 6 }}>
                <Select
                    label="Phone Prefix"
                    data={countryCodeOptions}
                    value={phonePrefix}
                    onChange={handlePhonePrefixChange}
                    checkIconPosition="right"
                    searchable
                    required
                />
            </Grid.Col>
            <Grid.Col span={{ xs: 6 }}>
                <TextInput
                    label="Phone Number"
                    placeholder="123 456 789"
                    maxLength={9}
                    {...form.getInputProps('phone')}
                    value={formatPhoneNumber(form.values.phone)}
                    onChange={(e) => form.setFieldValue('phone', formatPhoneNumber(e.currentTarget.value))}
                    error={form.errors.phone}
                    required
                />
            </Grid.Col>
        </Grid>
    );
}
