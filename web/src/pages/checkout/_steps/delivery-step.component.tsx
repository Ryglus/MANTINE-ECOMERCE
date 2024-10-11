import {useEffect, useState} from 'react';
import {Card, Radio, Stack, TextInput} from '@mantine/core';
import {useAuthStore} from '../../../store/auth-store';
import {DeliveryData, getEmptyDeliveryData, StepComponentProps} from "../../../lib/api/dto/checkout.dto";

export default function DeliveryStep({ onValidChange, data }: StepComponentProps) {
    const { user } = useAuthStore();
    const deliveryData = data?.delivery || null;
    const [useSavedAddress, setUseSavedAddress] = useState(!!user?.address);

    const [address, setAddress] = useState<DeliveryData>(
        deliveryData || {
            firstname: user?.name?.firstname || '',
            lastname: user?.name?.lastname || '',
            city: user?.address?.city || '',
            street: user?.address?.street || '',
            number: String(user?.address?.number || ''),
            zipcode: user?.address?.zipcode || '',
            phone: user?.phone || '',
        }
    );

    const handleChange = (field: keyof DeliveryData, value: string) => {
        setAddress((prev) => ({ ...prev, [field]: value }));
    };

    const handleAddressOptionChange = (value: 'saved' | 'new') => {
        setUseSavedAddress(value === 'saved');
        if (value === 'saved' && user?.address) {
            setAddress({
                firstname: user.name.firstname,
                lastname: user.name.lastname,
                city: user.address.city,
                street: user.address.street,
                number: String(user.address.number),
                zipcode: user.address.zipcode,
                phone: user.phone || '',
            });
        } else {
            setAddress(getEmptyDeliveryData());
        }
    };

    useEffect(() => {
        const isValid = Object.values(address).every((field) => field.trim().length > 0);
        onValidChange?.(isValid, address);
    }, [address, onValidChange]);

    return (
        <div>
            {user?.address && (
                <Stack mb="md">
                    <Radio.Group
                        label="Choose address option"
                        value={useSavedAddress ? 'saved' : 'new'}
                        onChange={(value) => handleAddressOptionChange(value as 'saved' | 'new')}
                    >
                        <Radio value="saved" label="Use saved address" />
                        <Radio value="new" label="Use different address" />
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
                <div>
                    <TextInput
                        label="First Name"
                        value={address.firstname}
                        onChange={(e) => handleChange('firstname', e.currentTarget.value)}
                        required
                    />
                    <TextInput
                        label="Last Name"
                        value={address.lastname}
                        onChange={(e) => handleChange('lastname', e.currentTarget.value)}
                        required
                    />
                    <TextInput
                        label="City"
                        value={address.city}
                        onChange={(e) => handleChange('city', e.currentTarget.value)}
                        required
                    />
                    <TextInput
                        label="Street"
                        value={address.street}
                        onChange={(e) => handleChange('street', e.currentTarget.value)}
                        required
                    />
                    <TextInput
                        label="Street Number"
                        value={address.number}
                        onChange={(e) => handleChange('number', e.currentTarget.value)}
                        required
                    />
                    <TextInput
                        label="Zip Code"
                        value={address.zipcode}
                        onChange={(e) => handleChange('zipcode', e.currentTarget.value)}
                        required
                    />
                    <TextInput
                        label="Phone"
                        value={address.phone}
                        onChange={(e) => handleChange('phone', e.currentTarget.value)}
                        required
                    />
                </div>
            )}
        </div>
    );
}
