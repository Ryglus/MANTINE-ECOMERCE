import {useState} from 'react';
import {IconBuildingWarehouse, IconTruckDelivery} from '@tabler/icons-react';
import {Badge, Card, Grid, Group, Text} from '@mantine/core';
import {ShippingCompanyOptions, shippingOptions} from '../../../lib/api/dto/shipping.dto';
import {DeliveryData} from '../../../lib/api/dto/checkout.dto';

interface DeliveryOptionsFormProps {
    form: { values: DeliveryData; setFieldValue: (field: string, value: any) => void };
}

export default function DeliveryOptionsForm({ form }: DeliveryOptionsFormProps) {
    const [selectedOption, setSelectedOption] = useState(
        form.values.shippingOption?.company + '-' + form.values.shippingOption?.option.optionName
    );

    const getIconByDeliveryType = (deliveryType: string) => {
        switch (deliveryType) {
            case 'home':
                return <IconTruckDelivery size={30} />;
            case 'pickup':
                return <IconBuildingWarehouse size={30} />;
            default:
                return null;
        }
    };

    const handleSelectionChange = (value: string) => {
        setSelectedOption(value);
        const selectedShippingOption = shippingOptions
            .flatMap((company) =>
                company.options.map((option) => ({
                    ...option,
                    company: company.company,
                    uniqueValue: `${company.company}-${option.optionName}`,
                }))
            )
            .find((option) => option.uniqueValue === value);

        if (selectedShippingOption) {
            form.setFieldValue('shippingOption', {
                company: selectedShippingOption.company,
                option: selectedShippingOption,
            });
        }
    };

    return (
        <Grid gutter="md">
            {shippingOptions.map((companyOption: ShippingCompanyOptions) => (
                <Grid.Col key={companyOption.company} span={{ base: 12, sm: 6, md: 4 }}>
                    <Text fw={500} size="lg" mb="sm">
                        {companyOption.company}
                    </Text>

                    {companyOption.options.map((method) => (
                        <Card
                            key={method.optionName}
                            shadow="sm"
                            padding="lg"
                            withBorder
                            className={`cursor-pointer transition-all duration-300 ${
                                selectedOption === `${companyOption.company}-${method.optionName}`
                                    ? 'border-blue-500 ring-2 ring-blue-300'
                                    : 'hover:shadow-md'
                            }`}
                            onClick={() => handleSelectionChange(`${companyOption.company}-${method.optionName}`)}
                        >
                            <Group >
                                <Text fw={500} size="sm">
                                    {method.optionName}
                                </Text>
                                {getIconByDeliveryType(method.deliveryType)}
                            </Group>

                            <Group  mt="xs">
                                <Badge color="green">{method.estimatedDeliveryTime}</Badge>
                                <Badge color="blue">{method.price}</Badge>
                            </Group>

                            <Text size="xs" color="dimmed" mt="md">
                                Select this option
                            </Text>
                        </Card>
                    ))}
                </Grid.Col>
            ))}
        </Grid>
    );
}
