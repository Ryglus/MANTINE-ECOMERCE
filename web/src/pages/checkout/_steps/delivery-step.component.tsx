import {useEffect, useState} from 'react';
import {Accordion, Card, Divider, Group, Stack, Text} from '@mantine/core';
import {useAuthStore} from '../../../store/auth-store';
import {DeliveryData, getDeliveryData, StepComponentProps} from "../../../lib/api/dto/checkout.dto";
import {useForm} from '@mantine/form';
import {DeliveryAddressForm, DeliveryOptionsForm, PersonalInfoForm} from '../_forms';
import {IconBuildingSkyscraper, IconMapPin} from '@tabler/icons-react';

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
            <Accordion multiple={false} defaultValue={useSavedAddress ? 'saved' : 'new'}>
                {user?.address && (
                    <Accordion.Item value="saved">
                        <Accordion.Control onClick={() => handleAddressOptionChange('saved')}>
                            <Group>
                                <IconMapPin size={24} />
                                <Text>Use saved address</Text>
                            </Group>
                        </Accordion.Control>
                        <Accordion.Panel>
                            <Card shadow="sm" p="lg" withBorder>
                                <Stack>
                                    <Text>{user.name.firstname} {user.name.lastname}</Text>
                                    <Text>{user.address.street} {user.address.number}</Text>
                                    <Text>{user.address.city}, {user.address.zipcode}</Text>
                                    <Text>{user.phone}</Text>
                                </Stack>
                            </Card>
                        </Accordion.Panel>
                    </Accordion.Item>
                )}

                <Accordion.Item value="new">
                    <Accordion.Control onClick={() => handleAddressOptionChange('new')}>
                        <Group>
                            <IconBuildingSkyscraper size={24} />
                            <Text>Enter a new address</Text>
                        </Group>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <Stack>
                            <PersonalInfoForm form={form} />
                            <DeliveryAddressForm form={form} />
                        </Stack>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
            <Divider my={"lg"}/>
            <DeliveryOptionsForm form={form} />
        </div>
    );
}
