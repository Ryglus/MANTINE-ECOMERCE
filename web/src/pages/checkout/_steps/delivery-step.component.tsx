import {useEffect, useState} from 'react';
import {Card, Radio, Stack} from '@mantine/core';
import {useAuthStore} from '../../../store/auth-store';
import {DeliveryData, getDeliveryData, StepComponentProps} from "../../../lib/api/dto/checkout.dto";
import {useForm} from '@mantine/form';

import {DeliveryAddressForm, DeliveryOptionsForm, PersonalInfoForm} from '../_forms';

export default function DeliveryStep({ onValidChange, data }: StepComponentProps) {
    const { user } = useAuthStore();
    const deliveryData = data?.delivery || null;
    const [useSavedAddress, setUseSavedAddress] = useState(!!user?.address);

    const form = useForm<DeliveryData>({
        initialValues: deliveryData || getDeliveryData(user),
        validate: {
            firstname: (value) => value.length > 0 ? null : 'First name is required',
            lastname: (value) => value.length > 0 ? null : 'Last name is required',
            city: (value) => value.length > 0 ? null : 'City is required',
            street: (value) => value.length > 0 ? null : 'Street is required',
            number: (value) => /^\d+$/.test(value) ? null : 'Street number must be a valid number',
            zipcode: (value) => /^\d{3} \d{2}$/.test(value) ? null : 'ZIP code must be in format 123 45',
            phone: (value) => /^\d{3} \d{3} \d{3}$/.test(value) ? null : 'Phone number must be in format 123 456 789',
            shippingOption: (value) => (value ? null : 'Shipping option is required'),
        },
    });

    const handleAddressOptionChange = (value: 'saved' | 'new') => {
        if (value === 'saved' && user?.address) {
            setUseSavedAddress(true);
            form.setValues({
                firstname: user.name.firstname,
                lastname: user.name.lastname,
                city: user.address.city,
                street: user.address.street,
                number: String(user.address.number),
                zipcode: user.address.zipcode,
                phone: user.phone || '',
            });
        } else {
            setUseSavedAddress(false);
            form.setValues(getDeliveryData());
        }
    };

    useEffect(() => {
        const isValid = form.isValid();
        onValidChange?.(isValid || useSavedAddress, {
            ...form.values
        });
    }, [form.values]);

    return (
        <div>
            {user?.address && (
                <Stack mb="md">
                    <Radio.Group
                        label="Select address option"
                        value={useSavedAddress ? 'saved' : 'new'}
                        onChange={(value) => handleAddressOptionChange(value as 'saved' | 'new')}
                    >
                        <Radio value="saved" label="Use saved address" />
                        <Radio value="new" label="Use new address" />
                    </Radio.Group>

                    {useSavedAddress && (
                        <Card shadow="sm" p="lg" withBorder>
                            <Stack>
                                <span>{user.name.firstname} {user.name.lastname}</span>
                                <span>{user.address.street} {user.address.number}</span>
                                <span>{user.address.city}, {user.address.zipcode}</span>
                                <span>{user.phone}</span>
                            </Stack>
                        </Card>
                    )}
                </Stack>
            )}

            {!useSavedAddress && (
                <>
                    <PersonalInfoForm form={form}/>
                    <DeliveryAddressForm form={form} />
                </>
            )}

            <DeliveryOptionsForm form={form}/>
        </div>
    );
}
