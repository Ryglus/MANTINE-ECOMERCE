import {useState} from 'react';
import {Card, Radio, Stack, TextInput} from '@mantine/core';
import {useAuthStore} from '../../../store/auth-store';

export default function DeliveryStep() {
    const { user } = useAuthStore();
    const [useSavedAddress, setUseSavedAddress] = useState(!!user?.address);
    const [address, setAddress] = useState({
        firstname: user?.name?.firstname || '',
        lastname: user?.name?.lastname || '',
        city: user?.address?.city || '',
        street: user?.address?.street || '',
        number: user?.address?.number || '',
        zipcode: user?.address?.zipcode || '',
        phone: user?.phone || '',
    });

    const handleChange = (field: string, value: string) => {
        setAddress((prev) => ({ ...prev, [field]: value }));
    };

    const handleAddressOptionChange = (value: string) => {
        setUseSavedAddress(value === 'saved');
        if (value === 'saved' && user?.address) {
            setAddress({
                firstname: user.name.firstname,
                lastname: user.name.lastname,
                city: user.address.city,
                street: user.address.street,
                number: user.address.number,
                zipcode: user.address.zipcode,
                phone: user.phone || '',
            });
        } else {
            setAddress({
                firstname: '',
                lastname: '',
                city: '',
                street: '',
                number: '',
                zipcode: '',
                phone: '',
            });
        }
    };

    return (
        <div>
            {user?.address && (
                <Stack mb="md">

                    <Radio.Group
                        label="Choose address option"
                        value={useSavedAddress ? 'saved' : 'new'}
                        onChange={handleAddressOptionChange}
                    >
                        <Radio value="saved" label="Use saved address" />
                        <Radio value="new" label="Use different address" />
                    </Radio.Group>

                    {useSavedAddress && (
                        <Card shadow="sm" p="lg" withBorder>
                            <span>{user.name.firstname} {user.name.lastname}</span>
                            <span>{user.address.city}</span>
                            <span>{user.address.street} {user.address.number}</span>
                            <span>{user.address.zipcode}</span>
                        </Card>
                    )}
                </Stack>
            )}

            {!useSavedAddress && (
                <div>
                    <TextInput
                        label="First Name"
                        value={address.firstname}
                        onChange={(e) => handleChange('firstname', e.target.value)}
                        required
                    />
                    <TextInput
                        label="Last Name"
                        value={address.lastname}
                        onChange={(e) => handleChange('lastname', e.target.value)}
                        required
                    />
                    <TextInput
                        label="City"
                        value={address.city}
                        onChange={(e) => handleChange('city', e.target.value)}
                        required
                    />
                    <TextInput
                        label="Street"
                        value={address.street}
                        onChange={(e) => handleChange('street', e.target.value)}
                        required
                    />
                    <TextInput
                        label="Street Number"
                        value={address.number}
                        onChange={(e) => handleChange('number', e.target.value)}
                        required
                    />
                    <TextInput
                        label="Zip Code"
                        value={address.zipcode}
                        onChange={(e) => handleChange('zipcode', e.target.value)}
                        required
                    />
                    <TextInput
                        label="Phone"
                        value={address.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        required
                    />
                </div>
            )}


        </div>
    );
}
